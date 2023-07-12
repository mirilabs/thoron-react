import SortedArray from '../lib/SortedArray.js';
import RendererLayer from './RendererLayer.js';

class Renderer {
  /**
   * Creates a renderer that can draw entities to a canvas
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this._layerIds = new SortedArray();
    this._layers = {}
    this._namedLayers = {}
  }

  get width() { return this.canvas.width }
  get height() { return this.canvas.height }
  
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
   * @param {string|number} id Layer's name or z-index
   * @returns The layer (one will be created if it doesn't exist).
   */
  layer(id) {
    return this._namedLayers[id] ??
      this._layers[id] ??
      this.addLayer(`layer ${id}`, id)
  }

  /**
   * Creates a new layer
   * @param {string} name The layer will be accessible by this name.
   * @param {number} id Layers with lower id values are drawn first.
   */
  addLayer(name, id) {
    let layer = new RendererLayer(this, id);
    layer.name = name;

    this._layerIds.add(id);
    this._layers[id] = layer;
    this._namedLayers[name] = layer;
    return layer;
  }

  removeLayer(id) {
    let { name } = this.layer(id);

    this._layerIds.splice(this._layerIds.indexOf(id), 1);
    delete this._layers[id];
    delete this._namedLayers[name];
  }

  removeAllLayers() {
    this._layerIds.forEach(id => this.removeLayer(id));
  }

  listEntities() {
    return this.layers.reduce((list, currentLayer) => {
      return list.concat(currentLayer.entities);
    }, [])
  }
}

export default Renderer;