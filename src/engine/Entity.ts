import Scene from "./Scene";
import { Component, ComponentId, ComponentSet } from "./ComponentMap";

type EntityId = Entity['id'];

class Entity {
    static nextId: number = 0;
    id: number; // unique ID
    scene: Scene;
    
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
        this.scene.componentMap.addComponent(this.id, cId, component);

        this.scene.systems.forEach(sys => {
            sys.onComponentAdded(this, cId, component);
        })
    }
}

export default Entity;
export {
    EntityId
}