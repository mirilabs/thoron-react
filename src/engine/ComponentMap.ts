import { EntityId } from "./Entity";
import ComponentSchema from "./components";

type ComponentId = keyof ComponentSchema;
type Component = ComponentSchema[ComponentId];

type ComponentSet = Partial<{ [key in ComponentId]: Component }>;

type ComponentState = {
    [K in keyof ComponentSchema]: Map<EntityId, ComponentSchema[K]>;
}

class ComponentMap {
    components: ComponentState = {
        position: new Map(),
        rectangle: new Map(),
        sprite: new Map(),
        draw: new Map()
    };

    addComponents(
        entityId: EntityId,
        components: ComponentSet
    ) {
        for (const componentId in components) {
            let component = components[componentId];

            // make component instance accessible via entityId & componentId
            this.components[componentId].set(entityId, component);
        }
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

    removeEntity(entityId: EntityId) {
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