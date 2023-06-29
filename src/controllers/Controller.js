import Background from './lib/Background.js';
import Sprite from './lib/Sprite.js';
import CoordinateConverter from './lib/CoordinateConverter.js';

class Controller {
  constructor(chapter, renderer) {
    this.chapter = chapter;
    this.renderer = renderer;

    let { canvas, width, height, tileWidth, tileHeight } = this.renderer;
    this.coords = new CoordinateConverter(canvas, tileWidth, tileHeight);
    let map = new Background(null, width, height, tileWidth, tileHeight);
    let units = this.chapter.unitLayer.units.map(unit => {
      // Get pixel coordinates
      let [x, y] = chapter.getPosition(unit.id);
      [x, y] = this.coords.toPixels(x, y, 'topLeft');

      let src = unit.record['sprite'];
      return new Sprite(src, x, y, tileWidth, tileHeight);
    })
    renderer.addEntities(map, ...units);
  }

  get canvas() { return this.renderer.canvas }
  get tileWidth() { return this.renderer.tileWidth }
  get tileHeight() { return this.renderer.tileHeight }

  /**
   * Determine position of the cursor relative to the canvas origin
   * @param {Event} event any MouseEvent or Touch
   */
  _getCursorPosition(event) {
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    return [x, y]
  }

  getTileCoordsAtCursor(event) {
    let [x, y] = this._getCursorPosition(event);
    return this.coords.toTiles(x, y);
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

export default Controller;