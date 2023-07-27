import EventEmitter from '../lib/EventEmitter';

class PointerEventHandler extends EventEmitter { 
  constructor(scene) {
    super();
    this.getScene = () => scene;
    let canvas = scene.canvas;
    this.canvas = canvas;

    this.target = null;

    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
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
  
  /**
   * Get the entity that a pointer event should target
   * @param {*} x 
   * @param {*} y 
   */
  _getPointerTarget(x, y) {
    for (let layer of this.getScene().layers) {
      let targetEntity = layer.getPointerTarget(x, y);
      if (targetEntity != null) return targetEntity;
    }
    return null;
  }

  onMouseDown(event) {
    let [x, y] = this._getCursorPosition(event);
    this.target = this._getPointerTarget(x, y);

    this.emit('mousedown', { x, y, target: this.target });
  }

  onMouseMove(event) {
    let [x, y] = this._getCursorPosition(event);
    this.emit('mousemove', { x, y, target: this.target })
  }

  onMouseUp(event) {
    let [x, y] = this._getCursorPosition(event);
    this.emit('mouseup', { x, y, target: this.target })

    this.target = null;
  }
}

export default PointerEventHandler