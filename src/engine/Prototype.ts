import Entity from "./Entity";
import Scene from "./Scene";
import {
    ComponentSet,
    ComponentId
} from "./components";

class Prototype {
    components: ComponentSet;

    constructor(components: ComponentSet) {
        this.components = components;
    }

    instantiate(scene: Scene): Entity {
        let entity = scene.createEntity();

        for (const cId in this.components) {
            const component = this.components[cId];
            entity.addComponent(cId as ComponentId, component);
        }

        return entity;
    }
}

export default Prototype;