import defaults from '../utils/defaults';
import SortedArray from './lib/SortedArray.js';

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
    background,
    tileWidth,
    tileHeight,
    tileSize,
    debug = false
  } = {}) {
    this.background = background;
    this.tileWidth = tileSize || tileWidth || defaults.TILE_SIZE;
    this.tileHeight = tileSize || tileHeight || defaults.TILE_SIZE;
    this.debug = debug;
    
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.entities = new SortedArray((a, b) => a.z - b.z);
    this.entities.byId = new Map();

    this.draw = this.draw.bind(this);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }
  
  /**
   * Draws a new frame
   */
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.entities.forEach(entity => entity.draw(this.ctx));
  }

  addEntity(id, entity) {
    this.entities.byId.set(id, entity);
    this.entities.add(entity);
    entity.init().then(this.draw);
  }
}

export default Renderer;