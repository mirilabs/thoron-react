import Background from './lib/Background.js';
import Sprite from './lib/Sprite.js';

class Controller {
  constructor(chapter, renderer) {
    this.chapter = chapter;
    this.renderer = renderer;

    let { width, height, tileWidth, tileHeight } = this.renderer;
    renderer.addEntities(
      new Background(null, width, height, tileWidth, tileHeight),
      ...(this.chapter.unitLayer.units.map(unit => {
        // Get pixel coordinates
        let [x, y] = chapter.unitLayer.getPosition(unit);
        [x, y] = this.renderer.getTilePosition(x, y, 'topLeft');

        let src = unit.record['sprite'];

        return new Sprite(src, x, y, tileWidth, tileHeight);
      }))
    );
  }

  get canvas() { return this.renderer.canvas }
  get tileWidth() { return this.renderer.tileWidth }
  get tileHeight() { return this.renderer.tileHeight }

  getTileCoordsAtCursor(event) {
    let [x, y] = this.renderer.getCursorPosition(event);
    return this.renderer.getTileCoords(x, y);
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