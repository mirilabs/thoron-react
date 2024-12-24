import ComponentMap from "./ComponentMap";
import Entity, { EntityId } from "./Entity";
import System from "./systems/System";
import CursorEventSystem from "./systems/CursorEventSystem";
import DrawSystem from "./systems/DrawSystem";
import SpriteSystem from "./systems/SpriteSystem";
import Camera from "./Camera";
import UpdateSystem from "./systems/UpdateSystem";

class Scene {
  canvas: HTMLCanvasElement;
  entities: Map<EntityId, Entity> = new Map();
  componentMap: ComponentMap = new ComponentMap();

  systems: System[] = [];
  updateSystem: UpdateSystem = new UpdateSystem();
  drawSystem: DrawSystem = new DrawSystem();
  spriteSystem: SpriteSystem = new SpriteSystem();
  cursorEventSystem: CursorEventSystem = new CursorEventSystem();

  camera: Camera = new Camera();

  private _paused: boolean = false;
  lastUpdateTime: DOMHighResTimeStamp;

  constructor(canvas: HTMLCanvasElement) {
    this.addSystems(
      this.updateSystem,
      this.drawSystem,
      this.spriteSystem,
      this.cursorEventSystem
    );
    
    this.setCanvas(canvas);

    this.update = this.update.bind(this);
    this.unpause();
  }

  get paused(): boolean {
    return this._paused;
  }

  pause() {
    this._paused = true;
  }

  unpause() {
    this._paused = false;
    window.requestAnimationFrame(this.update);
  }

  // update loop
  update(timeStamp: DOMHighResTimeStamp) {
    const dT = timeStamp - this.lastUpdateTime;
    this.lastUpdateTime = timeStamp;

    this.updateSystem.update(dT);
    
    this.draw();

    // next frame
    if (!this.paused) {
      window.requestAnimationFrame(this.update);
    }
  }
  
  // draw loop
  draw() {
    this.drawSystem.draw();
  }

  setCanvas(canvas: HTMLCanvasElement) {
    // cleanup bindings from previous canvas
    this.unsetCanvas();

    // bind to new canvas
    this.drawSystem.bindCanvas(canvas);
    this.cursorEventSystem.bindCursorEvents(canvas);
    this.canvas = canvas;
  }

  unsetCanvas() {
    if (this.canvas) {
      this.drawSystem.unbindCanvas();
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