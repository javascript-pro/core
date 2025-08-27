import {
  MathUtils,
  Plane,
  Vector3,
  Object3D,
  Raycaster,
  Color
} from "three";
import {
  component,
} from '../dispatcher';
import tileset from "../data/tileset.json";
import loader from "../utils/loader";
import Tile from './Tile';

let vec3 = new Vector3();
const LOD_COLORS = [new Color(0xff0000), new Color(0xffa500), new Color(0x00ff00)]; // Colors for 3 LOD levels

export default class TileManager extends component(Object3D, {
  raf: {
    renderPriority: Infinity, // always render in last the loop
    fps: Infinity, // no throttle to the render RAF
  },
}) {
  constructor(camera, tileSize = 10, gridSize = 1500) {
    super()
    this.camera = camera;
    this.tileSize = tileSize;
    this.gridSize = gridSize;
    this.tileset = this.formatTileset(tileset);

    this.tiles = {}; // Store active tiles
    this.tileCache = {}; // Cache loaded tiles

    this.LODDistances = [10, 40, 60]; // distance for 3 levels of detail
    this.debugLOD = false;
    this.visibleTiles = new Set();

    // Track camera's previous position to detect movement
    this.previousCameraPosition = new Vector3();
    this.raycaster = new Raycaster();
    this.groundPlane = new Plane(new Vector3(0, 1, 0), 0);

  }

  formatTileset(tileset) {
    return tileset.reduce((acc, tile) => {
      acc[`${tile["X Relative"]},${tile["Y Relative"]}`] = tile;
      return acc;
    }, {});
  }

  // Converts world position to tile index
  getTileIndex(x, z) {
    const tileX = Math.floor(x / this.tileSize);
    const tileZ = Math.floor(z / this.tileSize);
    return `${tileX},${tileZ}`;
  }

  async loadTile(tileX, tileZ, lodLevel) {
    const tileKey = `${tileX},${tileZ}`;
    if (!this.tileset[tileKey]) {
      return; // Tile does not exist
    }
    if (this.tiles[tileKey]) {
      await this.tiles[tileKey].loadLOD(lodLevel, this.debugLOD);
      return; // Tile is already loaded
    }

    // Check cache
    if (this.tileCache[tileKey]) {
      const tile = this.tileCache[tileKey];
      tile.loadLOD(lodLevel, this.debugLOD);
      this.add(tile);
      this.tiles[tileKey] = tile;
      return;
    }

    const tileData = this.tileset[tileKey];
    const tile = new Tile(tileKey, tileData, tileX, tileZ);
    this.tiles[tileKey] = tile;
    this.tileCache[tileKey] = tile; // Cache the tile
    await tile.loadLOD(lodLevel, this.debugLOD);
    this.add(tile);
    tile.updateMatrix();
  }

  // Unloads tiles that are no longer needed
  unloadTile(tileX, tileZ) {
    const tileKey = `${tileX},${tileZ}`;
    if (this.tiles[tileKey]) {
      this.remove(this.tiles[tileKey]);
      delete this.tiles[tileKey];
    }
  }

  // Determines the LOD level based on distance from the camera and altitude
  getLODLevel(distance) {
    let lodLevel = 0;

    if (distance < this.LODDistances[0]) {
      lodLevel = 1; // Highest LOD
    } else if (distance < this.LODDistances[1]) {
      lodLevel = 2; // Medium LOD
    } else {
      lodLevel = 3; // Lowest LOD
    }

    return lodLevel;
  }

  calculateDynamicRange() {
    const altitude = this.camera.position.y;

    // Get the direction the camera is facing (a normalized vector)
    const cameraDirection = vec3.set(0, 0, 0);
    this.camera.getWorldDirection(cameraDirection);

    // Get the pitch angle between the camera's direction and the ground plane (y = 0)
    const pitch = Math.abs(cameraDirection.y); // y component of the direction gives the pitch

    // Calculate the distance to the "horizon" or visible ground
    // Small pitch (closer to 0) means looking horizontally, large range.
    // Large pitch (closer to 1) means looking straight down, small range.
    let rangeMultiplier = 1 / pitch; // As pitch increases, the range decreases
    rangeMultiplier = MathUtils.clamp(rangeMultiplier, 1, 5); // Clamp to avoid extreme ranges

    // Adjust range based on altitude and orientation
    const dynamicRange = Math.floor(rangeMultiplier * altitude / this.tileSize);

    // Ensure we have at least 3 tiles in view even at low altitudes
    return Math.max(dynamicRange, 3);
  }

  // Get the point where the camera is looking at on the ground (y = 0 plane)
  getLookAtGroundPoint() {
    // Get the direction the camera is looking at
    const cameraDirection = vec3.set(0, 0, 0);
    this.camera.getWorldDirection(cameraDirection);

    // Set raycaster from the camera's position
    this.raycaster.set(this.camera.position, cameraDirection);

    // Calculate intersection with the ground plane at y = 0
    const intersectionPoint = vec3.set(0, 0, 0);
    this.raycaster.ray.intersectPlane(this.groundPlane, intersectionPoint);

    return intersectionPoint;
  }

  // Updates visible tiles based on where the camera is looking
  update() {
    // Get the point on the ground where the camera is looking
    const lookAtPoint = this.getLookAtGroundPoint();

    // Get altitude of the camera  
    const tileX = Math.floor(lookAtPoint.x / this.tileSize);
    const tileZ = Math.floor(lookAtPoint.z / this.tileSize);

    const newVisibleTiles = new Set();
    let gridRadius = this.calculateDynamicRange(); // Radius of grid to load around the camera

    // Loop through grid tiles within the defined distance radius
    for (let i = -gridRadius; i <= gridRadius; i++) {
      for (let j = -gridRadius; j <= gridRadius; j++) {
        const currentTileX = tileX + i;
        const currentTileZ = tileZ + j;

        vec3.set(currentTileX * this.tileSize, 0, -currentTileZ * this.tileSize);
        const distance = vec3.distanceTo(this.camera.position);
        const lodLevel = this.getLODLevel(distance);

        this.loadTile(currentTileX, currentTileZ, lodLevel);
        newVisibleTiles.add(`${currentTileX},${currentTileZ}`);
      }
    }

    // Update the set of currently visible tiles
    this.visibleTiles = newVisibleTiles;
  }

  // Checks if camera has moved enough to update the tiles
  hasCameraMoved() {
    const currentCameraPosition = this.camera.position;
    const threshold = 10; // Set a threshold to avoid tiny movements triggering updates

    const distanceMoved = this.previousCameraPosition.distanceTo(currentCameraPosition);
    if (distanceMoved > threshold) {
      this.previousCameraPosition.copy(currentCameraPosition); // Update previous position
      return true;
    }
    return false;
  }

  onDebug({
    gui
  }) {
    this.gui = gui.addFolder('Tile Manager');
    // add lod distances to the gui
    this.gui.add(this, 'debugLOD').name('Debug LOD')
    .onChange((v) => {
      this.debugLOD = v;
      Object.values(this.tiles).forEach(tile => tile.updateDebug(this.debugLOD));
    });
    for (let i = 0; i < this.LODDistances.length; i++) {
      this.gui.add(this.LODDistances, i, 0, 100)
        .name(`LOD ${i} Distance`)
        .onChange((v) => {
          this.LODDistances[i] = v;
          this.update();
        });
    }

  }
}