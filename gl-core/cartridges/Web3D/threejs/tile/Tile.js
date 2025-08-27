import {
  Object3D,
  MeshMatcapMaterial,
  MeshBasicMaterial,
  Color,
  BoxGeometry,
  Mesh,
} from 'three';
import loader from '../utils/loader';

const PATH_PREFIX = '/glb/';
const LOD_COLORS = [
  new Color(0xff0000),
  new Color(0xffa500),
  new Color(0x00ff00),
]; // Colors for 3 LOD levels
const DEFAULT_COLOR = new Color(0xffffff);
const matCapMaterial = new MeshMatcapMaterial({
  matcap: loader.resources.matcap.asset,
});

export default class Tile extends Object3D {
  constructor(tileKey, tileData, tileX, tileZ, matCapMaterial) {
    super();
    this.tileKey = tileKey;
    this.tileData = tileData;
    this.tileX = tileX;
    this.tileZ = tileZ;
    this.lodLevel = null;
    this.loading = false;
    this.lodCache = {}; // Cache for LOD models
    this.terrainCache = {}; // Cache for terrain models
  }

  async loadLOD(lodLevel, debug = false) {
    if (this.loading || this.lodLevel === lodLevel) return;

    this.lodLevel = lodLevel;

    this.loading = true;
    this.scale.setScalar(0.01);

    this.position.set(this.tileX, 0, -this.tileZ);
    this.position.multiplyScalar(10);
    this.updateMatrix();

    if (!this.lodCache[lodLevel]) {
      try {
        const glb = await loader.loadAsync(
          PATH_PREFIX + this.tileData.name + `_Buildings_LOD_${'1'}_draco.glb`,
        );
        const tile = glb.scene;
        this.add(tile); // Add the tile to the scene
        tile.updateMatrix();

        tile.traverse((obj) => {
          obj.updateMatrix();
          if (!obj.isMesh) return;
          obj.material = matCapMaterial.clone();
        });

        // Cache the loaded LOD model
        this.lodCache[lodLevel] = tile;
      } catch (error) {
        console.warn(`Failed to load LOD${lodLevel} Buildings:`, error);
      }
    }

    // Check if the terrain model is already cached
    if (!this.terrainCache[lodLevel]) {
      try {
        const glbTerrain = await loader.loadAsync(
          PATH_PREFIX + this.tileData.name + `_Terrain_LOD_${'1'}_draco.glb`,
        );
        const terrain = glbTerrain.scene;
        this.add(terrain); // Add the terrain to the LOD tile
        terrain.updateMatrix();

        terrain.traverse((obj) => {
          obj.updateMatrix();

          if (!obj.isMesh) return;
          const color = obj.material.color;
          const map = obj.material.map;
          obj.material = new MeshBasicMaterial({ color, map });
        });
        // Cache the loaded terrain model
        this.terrainCache[lodLevel] = terrain;
      } catch (error) {
        console.warn(`Failed to load LOD${lodLevel} Terrain`);
      }
    }
    Object.keys(this.lodCache).forEach((level) => {
      this.lodCache[level].visible =
        parseInt(level) === this.lodLevel && this.lodLevel < 3;
      this.lodCache[level].traverse((obj) => {
        if (obj.isMesh) {
          obj.material.color = debug ? LOD_COLORS[level - 1] : DEFAULT_COLOR;
        }
      });
    });
    this.loading = false;
  }

  updateDebug(debug = false) {
    Object.keys(this.lodCache).forEach((level) => {
      this.lodCache[level].traverse((obj) => {
        if (obj.isMesh) {
          obj.material.color = debug ? LOD_COLORS[level - 1] : DEFAULT_COLOR;
        }
      });
    });
  }
}
