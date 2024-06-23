import Entity from "./Entity";
import { ComponentSet } from "./ComponentMap";
import Scene from "./Scene";

class Prototype {
    components: ComponentSet;

    constructor(components: ComponentSet) {
        this.components = components;
    }

    instantiate(scene: Scene): Entity {
        let entity = scene.createEntity();
        let componentMap = scene.componentMap;

        componentMap.addComponents(entity.id, this.components);

        return entity;
    }
}

export default Prototype;