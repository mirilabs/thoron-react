import ComponentMap from "./ComponentMap";
import Entity, { EntityId } from "./Entity";
import System from "./systems/System";
import CursorEventSystem from "./systems/CursorEventSystem";
import DrawSystem from "./systems/DrawSystem";

class Scene {
    canvas: HTMLCanvasElement;
    entities: Map<EntityId, Entity> = new Map();
    componentMap: ComponentMap = new ComponentMap();

    systems: System[];
    drawSystem: DrawSystem;
    cursorEventSystem: CursorEventSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.drawSystem = new DrawSystem(this);
        this.cursorEventSystem = new CursorEventSystem(this);
        this.systems = [
            this.drawSystem,
            this.cursorEventSystem
        ]
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
        this.componentMap.onEntityDestroyed(id);
        this.entities.delete(id);
    }
    
    draw() {
        this.drawSystem.draw();
    }
}

export default Scene;