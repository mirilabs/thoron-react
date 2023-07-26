import EventEmitter from '../../lib/EventEmitter';

class CanvasEventHandler extends EventEmitter {
  constructor(coordinateConverter) {
    super();
    this.coords = coordinateConverter;

    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
  }
  
  attachCanvas(canvas) {
    this.canvas = canvas;
    canvas.addEventListener('mousedown', this.mousedown);
    canvas.addEventListener('mousemove', this.mousemove);
    canvas.addEventListener('mouseup', this.mouseup);
  }

  detachCanvas() {
    this.canvas.removeEventListener('mousedown', this.mousedown);
    this.canvas.removeEventListener('mousemove', this.mousemove);
    this.canvas.removeEventListener('mouseup', this.mouseup);
    this.canvas = null;
  }

  mousedown(event) {
    this._updateCoords(event);

    this.emit('mousedown', this.x, this.y)

    this._setPrevCoords();
  }

  mousemove(event) {
    this._updateCoords(event);

    // do not emit new event if cursor is still in the same tile
    if (this.x === this.prevX && this.y === this.prevY)
      return;

    this.emit('mousemove', this.x, this.y)

    this._setPrevCoords();
  }

  mouseup(event) {
    this._updateCoords(event);

    this.emit('mouseup', this.x, this.y);

    this.prevX = null;
    this.prevY = null;
  }

  /**
   * Determine position of the cursor relative to the canvas origin
   * @param {Event} event any MouseEvent or Touch
   */
  _getCursorPosition(event) {
    let x = event.pageX - this.canvas.offsetLeft;
    let y = event.pageY - this.canvas.offsetTop;
    return [x, y]
  }

  _updateCoords(event) {
    let [x, y] = this._getCursorPosition(event);
    let coords = this.coords.toTiles(x, y);
    if (coords != null) {
      [x, y] = coords;
      this.x = x;
      this.y = y;
    }
  }

  _setPrevCoords() { 
    this.prevX = this.x;
    this.prevY = this.y;
  }

  getCursorTileCoords() {
    return [this.x, this.y];
  }
}

export default CanvasEventHandler;