import defaults from '../utils/defaults';
import SortedArray from './lib/SortedArray.js';
import RendererLayer from './RendererLayer.js';

class Renderer {
  /**
   * Draws game state onto a canvas
   * @param {thoron.Chapter} chapter Chapter instance
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   * @param {Object} opts
   * @param {string} opts.background URL to the background image
   * @param {number} opts.tileWidth Width of a single tile, in pixels
   * @param {number} opts.tileHeight Height of a single tile, in pixels
   * @param {number} opts.tileSize This option sets both tileWidth and
   *  tileHeight if specified
   * @param {boolean} opts.debug If true, draws additional objects to help with
   *  debugging
   */
  constructor(canvas, {
    tileWidth,
    tileHeight,
    tileSize,
    debug = false
  } = {}) {
    this.params = {
      tileWidth: tileSize || tileWidth || defaults.TILE_SIZE,
      tileHeight: tileSize || tileHeight || defaults.TILE_SIZE,
      canvas,
      ctx: canvas.getContext('2d'),
      debug
    }

    this._layerIds = new SortedArray();
    this._layers = {}
    this._namedLayers = {}
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
  
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
    let { ctx, width, height } = this.params;
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
   * @param {number} zIndex Layers with lower z values are drawn first.
   */
  addLayer(name, zIndex) {
    layer = new RendererLayer(this, id);
    layer.name = name;

    this._layerIds.add(zIndex);
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
}

export default Renderer;