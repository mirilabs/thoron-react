import withPosition from './components/withPosition';
import withDraw from './components/withDraw';
import withRect from './components/withRect';
import withSprite from './components/withSprite';
import withDrag from './components/withDrag';

class Entity {
  constructor() {
    this._init = [];
  }

  onInit(callback) {
    this._init.push(callback);
  }

  async init() {
    let promises = this._init.map(cb => cb());
    await Promise.all(promises);
  }

  static addMixin(mixin) {
    this.prototype[mixin.name] = mixin;
  }
}

[
  withPosition,
  withDraw,
  withRect,
  withSprite,
  withDrag
]
  .forEach(mixin => Entity.addMixin(mixin));

export default Entity;