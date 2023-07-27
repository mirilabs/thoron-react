import CoordinateConverter from '../lib/CoordinateConverter';
import CanvasEventHandler from './controller/CanvasEventHandler';
import Controller from './controller/Controller';

class Game {
  constructor(chapter, opts = {}) {
    this.chapter = chapter;
    this.opts = {
      tileWidth: opts.tileSize ?? 64,
      tileHeight: opts.tileSize ?? 64,
      ...opts
    }
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.coordConverter = new CoordinateConverter(
      this.opts.tileWidth, this.opts.tileHeight, canvas.width, canvas.height
    );
    this.canvasEventHandler = new CanvasEventHandler(this.coordConverter);
    this.canvasEventHandler.setCanvas(canvas);

    this.controller = new Controller(this.chapter, this.canvasEventHandler);
  }

  unsetCanvas() {
    this.canvasEventHandler.unsetCanvas();
  }
}

export default Game;