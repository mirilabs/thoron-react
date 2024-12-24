import Scene from "./Scene";
import { AnyComponent, ComponentId, ComponentTypes, getComponentId } from "./components";

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

  getComponent<T extends ComponentId>(
    cId: T
  ): ComponentTypes[T] {
    let component = this.scene.componentMap.getComponent(this.id, cId);
    return component;
  }

  addComponent(component: AnyComponent) {
    this.signature.add(getComponentId(component));

    this.scene.componentMap.addComponent(this.id, component);

    this.scene.systems.forEach(sys => {
      sys.onComponentAdded(this, component);
    });

    component.onInit(this);
  }

  removeComponent<T extends ComponentId>(
    cId: T
  ): void {
    const component = this.getComponent(cId);
    this.signature.delete(cId);
    
    this.scene.componentMap.removeComponent(this.id, cId);

    this.scene.systems.forEach(system => {
      system.onComponentRemoved(this, component);
    });

    component.onDestroy(this);
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

    this.signature.forEach(cId => {
      this.removeComponent(cId);
    });
    
    this.scene.systems.forEach(system => {
      system.removeEntity(this);
    });
  }
}

export default Entity;
export {
  EntityId
}