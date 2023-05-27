import defaults from '../utils/defaults';
import positionMixin from './positionMixin.js';

class Renderer {
  /**
   * Draws game state onto a canvas
   * @param {thoron.Chapter} chapter Chapter instance
   * @param {HTMLCanvasElement} canvas The target <canvas> element
   * @param {Object} opts
   * @param {string} opts.background URL to the background image
   * @param {number} opts.tileWidth Width of a single tile, in pixels
   * @param {number} opts.tileHeight Height of a single tile, in pixels
   */
  constructor(canvas, {
    background,
    tileWidth = defaults.TILE_SIZE,
    tileHeight = defaults.TILE_SIZE
  } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.background = background;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
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
  draw(chapter) {
    this._drawBackground();
    this._drawGrid();
    this.drawUnits(chapter);
  }

  _drawBackground() {
    if (!this.background) { return }

    let img = new Image();
    img.src = this.background;
    this.ctx.drawImage(img, 0, 0);
  }

  _drawGrid() {
    let ctx = this.ctx;
    let x, y;
    
    ctx.beginPath();
    for (x = 0; x <= this.width; x += this.tileWidth) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    for (y = 0; y <= this.height; y += this.tileHeight) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();
  }

  _drawUnit(unit, [x, y]) {
    let ctx = this.ctx;
    let origin = this.getTilePosition(x, y, 'topLeft');
    [x, y] = origin;
    console.log(x, y)

    if (unit.record.sprite) {
      let img = new Image(this.tileWidth, this.tileHeight);
      img.src = unit.record.sprite;
      img.onload = (() => {
        this.ctx.drawImage(img, x, y, this.tileWidth, this.tileHeight);
      })
    }
    else {
      this.ctx.fillText(unit.id, x, y, this.tileWidth);
    }
  }
  
  /**
   * Draw unit sprites. Each unit's `record` should have a `sprite` property
   * (url to image), or else the unit will be drawn as text (its id).
   * @param {thoron.Chapter} chapter Chapter to draw units from
   */
  drawUnits(chapter) {
    chapter.unitLayer.units.forEach(unit => {
      let tileCoords = chapter.unitLayer.getPosition(unit);
      this._drawUnit(unit, tileCoords)
    });
  }
}

Object.assign(Renderer.prototype, positionMixin);

export default Renderer;