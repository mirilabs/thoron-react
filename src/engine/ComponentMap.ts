import { EntityId } from "./Entity";
import {
  ComponentSchema,
  ComponentId,
  Component
} from "./components";

type AttributeMap<T> = Map<EntityId, T>;
type ComponentState = {
  [K in keyof ComponentSchema]: AttributeMap<ComponentSchema[K]>;
}

class ComponentMap {
  components: ComponentState = {
    position: new Map(),
    velocity: new Map(),
    rectangle: new Map(),
    sprite: new Map(),
    update: new Map(),
    draw: new Map(),
    cursorEvents: new Map(),
  };

  addComponent<CId extends ComponentId>(
    entityId: EntityId,
    componentId: CId,
    component: ComponentSchema[CId]
  ) {
    let componentInstanceMap = this.components[componentId];
    componentInstanceMap.set(entityId, component);
  }

  getComponent<T extends Component> (
    entityId: EntityId,
    componentId: ComponentId
  ): T {
    return this.components[componentId].get(entityId) as T;
  }

  removeComponent(
    entityId: EntityId,
    componentId: ComponentId
  ) {
    this.components[componentId].delete(entityId);
  }

  onEntityDestroyed(entityId: EntityId) {
    for (const componentId in this.components) {
      this.components[componentId].delete(entityId);
    }
  }
}

export default ComponentMap;