import ComponentMap from "./ComponentMap";
import Entity, { EntityId } from "./Entity";
import System from "./systems/System";
import CursorEventSystem from "./systems/CursorEventSystem";
import DrawSystem from "./systems/DrawSystem";
import SpriteSystem from "./systems/SpriteSystem";
import EventSystem from "./systems/EventSystem";

class Scene {
    canvas: HTMLCanvasElement;
    entities: Map<EntityId, Entity> = new Map();
    componentMap: ComponentMap = new ComponentMap();

    systems: System[] = [];
    drawSystem: DrawSystem;
    spriteSystem: SpriteSystem;
    eventSystem: EventSystem;
    cursorEventSystem: CursorEventSystem;

    constructor(canvas: HTMLCanvasElement) {
        this.drawSystem = new DrawSystem();
        this.spriteSystem = new SpriteSystem();
        this.eventSystem = new EventSystem();
        this.cursorEventSystem = new CursorEventSystem();

        this.addSystems(
            this.drawSystem,
            this.spriteSystem,
            this.eventSystem,
            this.cursorEventSystem,   
        );
        
        this.setCanvas(canvas);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        // cleanup bindings from previous canvas
        this.unsetCanvas();

        // bind to new canvas
        this.drawSystem.setCanvas(canvas);
        this.spriteSystem.setCanvas(canvas);
        this.cursorEventSystem.bindCursorEvents(canvas);
        this.canvas = canvas;
    }

    unsetCanvas() {
        if (this.canvas) {
            this.cursorEventSystem.unbindCursorEvents(this.canvas);
            delete this.canvas;
        }
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
        this.spriteSystem.draw();
    }

    addSystem(system: System) {
        this.systems.push(system);
        system.mount(this);
    }

    addSystems(...systems: System[]) {
        systems.forEach(system => this.addSystem(system));
    }

    removeSystem(system: System) {
        let index = this.systems.indexOf(system);
        if (index < 0) return;

        this.systems.splice(index, 1);
        system.unmount();
    }
}

export default Scene;