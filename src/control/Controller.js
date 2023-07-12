class Controller {
  constructor(chapter, canvasEventHandler) {
    this.chapter = chapter;
    this.canvasEventHandler = canvasEventHandler;

    this.coords = canvasEventHandler.coords;
  }

  getTileCoordsAtCursor(event) {
    let [x, y] = this.canvasEventHandler.getCursorTileCoords();
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
  
  selectTileAtCursor(event) {
    let tileCoords = this.getTileCoordsAtCursor(event);
    if (tileCoords == null) return;

    // this.renderer.setHighlight
  }

  mouseDown(event) {
    this.selectedUnit = this.getUnitAtCursor(event) ?? null;
    console.log(this.selectedUnit);
  }
}

export default Controller;