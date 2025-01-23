import { EntityId } from "./Entity";
import {
  AnyComponent,
  ComponentTypes,
  getComponentId
} from "./components";

type ComponentMapState = {
  [K in keyof ComponentTypes]: Map<EntityId, ComponentTypes[K]>
}

class ComponentMap {
  components: ComponentMapState = {
    position: new Map(),
    rectangle: new Map(),
    update: new Map(),
    draw: new Map(),
    sprite: new Map(),
    cursorEvents: new Map()
  };

  addComponent<T extends AnyComponent>(
    entityId: EntityId,
    component: T
  ): void {
    let cId = getComponentId(component);    
    let componentInstanceMap = this.components[cId] as Map<EntityId, T>;
    componentInstanceMap.set(entityId, component);
  }

  getComponent<T extends keyof ComponentTypes> (
    entityId: EntityId,
    componentType: T
  ): ComponentTypes[T] {
    let component = this.components[componentType].get(entityId);
    return component;
  }

  removeComponent<T extends keyof ComponentTypes> (
    entityId: EntityId,
    componentType: T
  ): void {
    this.components[componentType].delete(entityId);
  }

  onEntityDestroyed(entityId: EntityId) {
    Object.keys(this.components).forEach((cId) => {
      this.components[cId].delete(entityId);
    });
  }
}

export default ComponentMap;