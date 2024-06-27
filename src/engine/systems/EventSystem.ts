import { Component, ComponentId, ComponentSchema } from "../components";
import Entity from "../Entity";
import System from "./System";

class EventSystem extends System {
    signature: Set<keyof ComponentSchema> = new Set([
        
    ]);

    onComponentAdded(
        entity: Entity,
        componentId: ComponentId,
        component: Component
    ): void {
        
    }
}

export default EventSystem;