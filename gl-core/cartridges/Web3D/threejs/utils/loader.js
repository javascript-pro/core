import { FileLoader, TextureLoader } from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import dispatcher from './dispatcher';

// Configure and create Draco decoder.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const textureLoader = new TextureLoader();
// Define a mapping from file extensions to Three.js loaders
const loadersMap = {
  '.png': textureLoader, // 'png' extension will use TextureLoader internally
  '.jpg': textureLoader,
  '.webp': textureLoader,
  '.glb': gltfLoader,
  '.gltf': gltfLoader,
  // ... add other mappings as needed
};

const RESOURCES = [
  {
    name: 'matcap',
    // url: '/img/matcap.webp',
    url: '/img/matcap-white.png',
  },
];

class Loader {
  constructor() {
    this.resources = {};
    RESOURCES.forEach((res) => {
      // Initialize the resource object first
      this.resources[res.name] = {
        url: res.url,
        asset: null,
        loaded: 0,
        total: 0,
      };

      // Then create the promise and assign resolve and reject
      this.resources[res.name].loading = new Promise((resolve, reject) => {
        this.resources[res.name].resolve = resolve;
        this.resources[res.name].reject = reject;
      });
    });
  }
  preload() {
    dispatcher.trigger({ name: 'loadStart' });

    const loadPromises = RESOURCES.map((res) => {
      return new Promise((resolve, reject) => {
        const extension = res.url.substring(res.url.lastIndexOf('.'));
        const loader = loadersMap[extension] || new FileLoader();

        loader.load(
          res.url,
          (asset) => {
            this.resources[res.name].asset = asset;
            this.resources[res.name].resolve(asset);
            resolve(asset); // Resolve the promise here
          },
          (progressEvent) => {
            this.onProgress(res.name, progressEvent);
          },
          (error) => {
            console.error('Error loading asset:', error);
            reject(error); // Reject the promise here
          },
        );
      });
    });

    return Promise.allSettled(loadPromises).then((results) => {
      this.finish(results);
    });
  }

  loadAsync(url) {
    return new Promise((resolve, reject) => {
      const extension = url.substring(url.lastIndexOf('.'));
      const loader = loadersMap[extension] || new FileLoader();

      resolve(loader.loadAsync(url));
    });
  }

  load(url, onComplete, onError) {
    const loader = loadersMap[extension] || new FileLoader();
    loader.load(url, onComplete, null, onError);
  }

  onProgress(resourceName, progressEvent) {
    if (progressEvent.lengthComputable) {
      const resource = this.resources[resourceName];
      resource.loaded = progressEvent.loaded;
      resource.total = progressEvent.total;
      this.updateOverallProgress();
    }
  }

  updateOverallProgress() {
    const totalBytes = Object.values(this.resources).reduce(
      (acc, res) => acc + res.total,
      0,
    );
    const loadedBytes = Object.values(this.resources).reduce(
      (acc, res) => acc + res.loaded,
      0,
    );

    const progress = totalBytes > 0 ? (loadedBytes / totalBytes) * 100 : 0;
    if (this.currentProgress === progress) {
      return;
    }
    this.currentProgress = progress;
    dispatcher.trigger({ name: 'loadProgress' }, { progress });
  }

  finish(loadResults) {
    dispatcher.trigger(
      { name: 'loadEnd' },
      { resources: this.resources, results: loadResults },
    );
  }
}

export default new Loader();
