import CoordinateConverter from './lib/CoordinateConverter.js';
import Animator from './Animator.js';

class Controller {
  constructor(chapter, renderer) {
    this.chapter = chapter;
    this.renderer = renderer;
    this.animator = new Animator(renderer);

    let { canvas, tileWidth, tileHeight } = this.renderer;
    this.coords = new CoordinateConverter(canvas, tileWidth, tileHeight);

    this._registerEvents();
  }

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
  
  /**
   * Canvas events -> Controller -> Chapter events
   * Chapter events -> Animator -> Generate new animations
   */
  selectTileAtCursor(event) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return;

    // this.renderer.setHighlight
  }

  _registerEvents(canvas) {
    this.canvas.addEventListener('mousedown', event => {
      // this.selectUnit(this.getUnitAtCursor(event));
    })
  }

  setCanvas(canvas) {
    this._registerEvents(canvas)
  }

  unsetCanvas() {

  }
}

export default Controller;