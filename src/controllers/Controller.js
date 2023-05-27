import positionMixin from "./positionMixin";

class Controller {
  constructor(chapter, renderer) {
    this.renderer = renderer;
    this.canvas = renderer.canvas;
    this.tileWidth = renderer.tileWidth;
    this.tileHeight = renderer.tileHeight;

    renderer.draw(chapter);
  }

  getTileCoordsAtCursor(event) {
    let [x, y] = this.getCursorPosition(event);
    return this.getTileCoords(x, y);
  }

  getTileAtCursor(event, chapter) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return null;

    return chapter.terrain.getTile(tileCoords, true);
  }

  getUnitAtCursor(event, chapter) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return null;

    return chapter.unitLayer.getUnitAt(tileCoords);
  }
}

Object.assign(Controller.prototype, positionMixin);

export default Controller;