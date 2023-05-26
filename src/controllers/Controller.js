import positionMixin from "./positionMixin";

class Controller {
  constructor(renderer) {
    this.renderer = renderer;
    this.canvas = renderer.canvas;
    this.tileWidth = renderer.tileWidth;
    this.tileHeight = renderer.tileHeight;

    renderer.draw();
  }

  getTileCoordsAtCursor(event) {
    let [x, y] = this.getCursorPosition(event);
    return this.getTileCoords(x, y);
  }
}

Object.assign(Controller.prototype, positionMixin);

export default Controller;