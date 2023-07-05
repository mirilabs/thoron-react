import Background from './lib/Background.js';
import Sprite from './lib/Sprite.js';
import CoordinateConverter from './lib/CoordinateConverter.js';
import Animator from './Animator.js';

class Controller {
  constructor(chapter, renderer) {
    this.chapter = chapter;
    this.renderer = renderer;

    let { canvas, width, height, tileWidth, tileHeight } = this.renderer;
    this.coords = new CoordinateConverter(canvas, tileWidth, tileHeight);

    this.animator = new Animator(renderer);

    let map = new Background(null, width, height, tileWidth, tileHeight);
    renderer.addEntity("MAP", map);

    this.chapter.unitLayer.units.forEach(unit => {
      // Get pixel coordinates
      let [x, y] = chapter.getPosition(unit.id);
      [x, y] = this.coords.toPixels(x, y, 'topLeft');

      let src = unit.record['sprite'];
      let sprite = new Sprite(src, x, y, tileWidth, tileHeight);
      renderer.addEntity(unit.id, sprite)
    });

    this._registerEvents();
  }

  _registerEvents() {
    this.canvas.addEventListener('mousedown', event => {
      this.selectUnit(this.getUnitAtCursor(event));
    })
  }

  /**
   * Canvas events -> Controller -> Chapter events
   * Chapter events -> Animator -> Generate new animations
   */

  get canvas() { return this.renderer.canvas }

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

  getTileAtCursor(event) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return null;

    return this.chapter.terrain.getTile(tileCoords, true);
  }

  getUnitAtCursor(event) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return null;

    return this.chapter.unitLayer.getUnitAt(tileCoords);
  }
}

export default Controller;