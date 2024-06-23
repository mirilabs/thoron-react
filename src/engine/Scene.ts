import ComponentMap from "./ComponentMap";
import Entity, { EntityId } from "./Entity";
import DrawSystem from "./systems/DrawSystem";

class Scene {
    canvas: HTMLCanvasElement;
    entities: Map<EntityId, Entity> = new Map();
    componentMap: ComponentMap = new ComponentMap();

    drawSystem: DrawSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.drawSystem = new DrawSystem(this);
    }

    createEntity(): Entity {
        let ent = new Entity(this);
        this.entities.set(ent.id, ent);
        return ent;
    }

    getEntity(id: EntityId) {
        return this.entities.get(id);
    }

    removeEntity(id: EntityId) {
        this.componentMap.removeEntity(id);
        this.entities.delete(id);
    }
}

export default Scene;