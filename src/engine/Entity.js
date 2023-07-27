import withPosition from './components/withPosition';
import withDraw from './components/withDraw';
import withRect from './components/withRect';
import withSprite from './components/withSprite';

class Entity {
  constructor(opts) {
    Object.assign(this, opts);
  }

  static addMixin(mixin) {
    this.prototype[mixin.name] = mixin;
  }

  static {
    this.prototype._behaviors = {}
  }

  static addEvent(eventName) {
    // add array of behavior callbacks
    this.prototype._behaviors[eventName] = [];

    // add function to call all behavior callbacks associated with this event
    this.prototype[eventName] = function (...args) {
      this._callBehavior(eventName, args);
    }
  }

  _callBehavior(eventName, args) {
    this._behaviors[eventName].forEach(cb => {
      cb(...args)
    })
  }

  /**
   * Add behavior to an Entity
   * @param {*} behavior Object with key: event, value: the function to be
   *  called when the event occurs. Example: `{ onInit() { this.draw() } }`
   */
  withBehavior(behavior) {
    Object.keys(behavior).forEach(event => {
      let callback = behavior[event].bind(this);
      this._behaviors[event].push(callback);
    });

    return this;
  }
}

[
  withPosition,
  withDraw,
  withRect,
  withSprite
]
  .forEach(mixin => Entity.addMixin(mixin));

[
  'onInit',
  'onMouseDown',
  'onMouseDownGlobal',
  'onMouseMove',
  'onMouseMoveGlobal',
  'onMouseUp',
  'onMouseUpGlobal'
]
  .forEach(event => Entity.addEvent(event));

export default Entity;