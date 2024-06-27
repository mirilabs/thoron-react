import Scene from "./Scene";
import { Component, ComponentId } from "./components";

type EntityId = Entity['id'];

class Entity {
  static nextId: number = 0;
  id: number; // unique ID
  scene: Scene;
  signature: Set<ComponentId> = new Set();
  
  constructor(scene: Scene) {
    this.id = Entity.generateId();
    this.scene = scene;
  }

  static generateId() {
    return this.nextId++;
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

    this.scene.systems.forEach(sys => {
      sys.onComponentRemoved(this, cId);
    });
  }

  destroy() {
    this.scene.systems.forEach(system => {
      system.removeEntity(this);
    });
  }
}

export default Entity;
export {
  EntityId
}