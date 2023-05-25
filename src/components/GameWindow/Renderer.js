import defaults from "./defaults";

class Renderer {
  /**
   * Draws game state onto a canvas
   * @param {thoron.Chapter} chapter Chapter instance
   * @param {React.Ref} canvasRef Reference to the target <canvas> element
   * @param {Object} opts
   * @param {string} opts.background URL to the background image
   * @param {number} opts.tileWidth Width of a single tile, in pixels
   * @param {number} opts.tileHeight Height of a single tile, in pixels
   * @param {Object} ctxOpts Properties of this object will be assigned to the
   *  CanvasRenderingContext2D used for drawing (`lineWidth`, `font`, etc.)
   */
  constructor(chapter, canvasRef, {
    background,
    tileWidth = defaults.TILE_SIZE,
    tileHeight = defaults.TILE_SIZE,
    ctxOpts = {
      lineWidth: 1
    }
  }) {
    this.canvasRef = canvasRef;
    this.canvas = canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.chapter = chapter;

    this.background = background;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    Object.assign(this.ctx, ctxOpts);
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  draw() {
    this.drawBackground();
    this.drawGrid();
  }

  drawBackground() {
    if (!this.background) { return }

    let img = new Image();
    img.src = this.background;
    this.ctx.drawImage(img, 0, 0);
  }

  drawGrid() {
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
}

export default Renderer;