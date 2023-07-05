class DrawnEntity {
  constructor(x, y, w = 0, h = 0, opts = {}) {
    this.transform = { x, y, w, h }
    this._zIndex = opts.z || 0;
    this._customDraw = opts.draw || (() => {});
  }

  get x() { return this.transform.x }
  get y() { return this.transform.y }
  get width() { return this.transform.w }
  get height() { return this.transform.h }
  get z() { return this._zIndex }
  set z(value) { this._zIndex = value; }

  init() {
    return new Promise((resolve, reject) => { resolve() })
  }

  draw(ctx) {
    this._customDraw(ctx);
  }
}

class DrawCommand extends DrawnEntity {
  constructor(drawFn, x, y, w, h) {
    super(x, y, w, h);
    this.draw = drawFn.bind(this);
  }
}

export default DrawnEntity;
export { DrawCommand }