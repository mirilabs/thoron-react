import Scene from "./Scene";
import { Component, ComponentId } from "./components";

type EntityId = Entity['id'];

class Entity {
  static nextId: number = 0;
  id: number; // unique ID

  private _scene: WeakRef<Scene>;
  signature: Set<ComponentId> = new Set();

  private _parent: WeakRef<Entity>;
  children: Set<Entity> = new Set();
  
  constructor(scene: Scene) {
    this.id = Entity.generateId();
    this._scene = new WeakRef(scene);
  }

  static generateId() {
    return this.nextId++;
  }

  get scene() {
    return this._scene.deref();
  }

  get parent() {
    return this._parent ? this._parent.deref() : undefined;
  }

  getComponent<T extends Component>(componentId: ComponentId): T {
    return this.scene.componentMap.getComponent(this.id, componentId);
  }

  addComponent(cId: ComponentId, component: Component) {
    this.signature.add(cId);

    this.scene.componentMap.addComponent(this.id, cId, component);

    this.scene.systems.forEach(sys => {
      sys.onComponentAdded(this, cId, component);
    });
  }

  removeComponent(cId: ComponentId) {
    this.signature.delete(cId);

    this.scene.componentMap.removeComponent(this.id, cId);

    this.scene.systems.forEach(system => {
      system.onComponentRemoved(this, cId);
    });
  }

  addChild() {
    let child = this.scene.createEntity();
    this.children.add(child);
    return child;
  }

  removeChild(child: Entity) {
    this.children.delete(child);
  }

  destroy() {
    this.children.forEach((child) => {
      // remove parent reference before destroying to prevent infinite loop
      delete child._parent;
      child.destroy();
    });

    if (this.parent) {
      this.parent.removeChild(this);
    }
    
    this.scene.systems.forEach(system => {
      system.removeEntity(this);
    });
  }
}

export default Entity;
export {
  EntityId
}