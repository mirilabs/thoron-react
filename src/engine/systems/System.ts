import ComponentMap, { Component, ComponentId } from "../ComponentMap";
import Entity from "../Entity";
import Scene from "../Scene";

class System {
    scene: Scene;
    
    constructor(scene: Scene) {
        this.scene = scene;
    }

    get componentMap(): ComponentMap {
        return this.scene.componentMap;
    }

    onComponentAdded(
        entity: Entity,
        componentId: ComponentId,
        component: Component
    ) {
        
    }
}

export default System;