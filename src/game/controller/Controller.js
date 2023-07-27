import EventEmitter from '../../lib/EventEmitter';

class Controller {
  constructor(chapter, canvasEventHandler) {
    this.chapter = chapter;
    this.canvasEventHandler = canvasEventHandler;
    
    this.events = new EventEmitter();
    
    this.listen(canvasEventHandler);
  }

  listen(canvasEventHandler) {
    canvasEventHandler.on('mousedown', this.selectTile.bind(this));
    canvasEventHandler.on('mousemove', this.hover.bind(this));
    canvasEventHandler.on('mouseup', this.mouseUp.bind(this));

    canvasEventHandler.on('mousedown', this.dragStart.bind(this));
  }

  selectTile(x, y) {
    let unit = this.chapter.getUnitAt([x, y]);
    this.selectedUnit = unit;
    this.events.emit('select_unit', unit);

    let tile = this.chapter.terrain.getTile([x, y], true);
    this.selectedTile = tile;
    this.events.emit('select_tile', tile);
  }

  hover(x, y) {
    if (this.selectedTile == null) {
      let tile = this.chapter.terrain.getTile([x, y], true);
      this.events.emit('select_tile', tile);
    }
  }

  dragStart(x, y) {
    this.dragging = true;
    if (this.selectedUnit != null) {
      this.draggingUnit = true;
    }
  }

  dragMove(x, y) {
    if (!this.dragging) return;
    if (this.draggingUnit) {
      this.events.emit('drag_unit')
    }
  }

  dragEnd(x, y) {
    if (!this.dragging) return;
    this.events.emit('move_unit', this.selectedUnit, x, y);
    this.dragging = false;
  }

  mouseMove(x, y) {
    this.events.emit('')
  }

  mouseUp(x, y) {
    if (this.dragging) {
      // drop (finish drag)
      this.events.emit('move_unit', this.selectedUnit, x, y);
    }

    if (this.selectedUnit != null) {

    }

    this.dragging = false;
  }
}

export default Controller;