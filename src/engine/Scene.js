import SortedArray from '../lib/SortedArray.js';
import RendererLayer from './Layer.js';
import PointerEventHandler from './PointerEvents.js';

class Scene {
  /**
   * Creates a scene that can draw entities to a canvas
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.pointerEvents = new PointerEventHandler(this);

    this._layerIds = new SortedArray();
    this._layers = {}
    this._layerAliases = {}
  }

  get width() { return this.canvas.width }
  get height() { return this.canvas.height }
  
  // Array of Layers from bottom to top
  get layers() {
    return this._layerIds.map(id => this._layers[id]);
  }
  
  /**
   * Draws a new frame
   */
  draw() {
    this.clear();
    this.layers.forEach(layer => layer.draw());
  }
  
  /**
   * Clears canvas
   */
  clear() {
    console.log('clearing')
    let { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * Gets a layer
   * @param {string|number} id Layer's name or id
   * @returns The layer (one will be created if it doesn't exist).
   */
  layer(id) {
    return this._layers[id] ??
      this._layers[this._layerAliases[id]] ??
      this.addLayer(id)
  }

  /**
   * Creates a new layer
   * @param {number} id Layers with lower id values are drawn first.
   * @param {string} alias The layer will be accessible by this name.
   */
  addLayer(id, alias) {
    let layer = new RendererLayer(this, id);
    this._layerIds.add(id);
    this._layers[id] = layer;

    if (alias) {
      this._layerAliases[alias] = id;
    }
    return layer;
  }

  removeLayer(idOrAlias) {
    let id = this._layers[idOrAlias] ?
      idOrAlias :
      this._layerAliases[idOrAlias];

    this._layerIds.splice(this._layerIds.indexOf(id), 1);
    delete this._layers[id];
    Object.keys(this._layerAliases)
      .filter(alias => this._layerAliases[alias] === id)
      .forEach(alias => delete this._layerAliases[alias]);
  }

  removeAllLayers() {
    this._layerIds.forEach(id => this.removeLayer(id));
  }

  addEntity(entity, layerId) {
    this.layer(layerId).addEntity(entity);
  }

  listEntities() {
    return this.layers.reduce((list, currentLayer) => {
      return list.concat(currentLayer.entities);
    }, [])
  }
}

export default Scene;