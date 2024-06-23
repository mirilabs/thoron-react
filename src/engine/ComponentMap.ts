import { EntityId } from "./Entity";
import ComponentSchema from "./components";

type ComponentId = keyof ComponentSchema;
type Component = ComponentSchema[ComponentId];

type ComponentSet = Partial<{ [key in ComponentId]: Component }>;

type AttributeMap<T> = Map<EntityId, T>;
type ComponentState = {
    [K in keyof ComponentSchema]: AttributeMap<ComponentSchema[K]>;
}

class ComponentMap {
    components: ComponentState = {
        position: new Map(),
        rectangle: new Map(),
        sprite: new Map(),
        draw: new Map(),
        cursorEvents: new Map()
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
export {
    ComponentId,
    Component,
    ComponentSet
}