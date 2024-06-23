import Entity from "./Entity";
import { Component, ComponentId, ComponentSet } from "./ComponentMap";
import Scene from "./Scene";

class Prototype {
    components: ComponentSet;

    constructor(components: ComponentSet) {
        this.components = components;
    }

    instantiate(scene: Scene): Entity {
        let entity = scene.createEntity();
        let componentMap = scene.componentMap;

        for (const cId in this.components) {
            const component = this.components[cId];
            componentMap.addComponent(entity.id, cId as ComponentId, component);
        }

        return entity;
    }
}

export default Prototype;