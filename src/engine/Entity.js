import Node from './Node';
import DrawComponent from './components/DrawComponent';
import Rectangle from './components/Rectangle';
import Sprite from './components/Sprite';
import PointerEventTarget from './components/PointerEventTarget';
import Position from './components/Position';

class Entity extends Node {
  components = new Map();

  addComponent(component) {
    this.addChild(component);
    this.components.set(component.constructor, component);
  }

  addComponents(...components) {
    components.forEach(cmp => this.addComponent(cmp));
  }

  getComponent(ComponentType) {
    return this.components.get(ComponentType);
  }

  removeComponent(component) {
    this.removeChild(component);
    this.components.delete(component.constructor);
  }
}

const builderMethods = {
  withPosition(x, y) {
    this.addComponent(new Position(x, y));
    return this;
  },

  withRect(width, height) {
    this.addComponent(new Rectangle(this, width, height));
    return this;
  },

  withDraw(zIndex, drawFn) {
    this.addComponent(new DrawComponent(zIndex, drawFn));
    return this;
  },

  withSprite(zIndex, spriteUrl) {
    this.addComponent(new Sprite(this, zIndex, spriteUrl));
    return this;
  },

  withPointerEvents() {
    this.addComponent(new PointerEventTarget(this));
    return this;
  }
}

Object.assign(Entity.prototype, builderMethods);

export default Entity;