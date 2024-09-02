import { ComponentId } from "../components";
import Entity from "../Entity";
import System from "./System";

class MotionSystem extends System {
  prevTimeStamp: DOMHighResTimeStamp;
  private isActive: boolean = false;

  signature: Set<ComponentId> = new Set([
    'position',
    'velocity'
  ]);

  constructor() {
    super();
    this.update = this.update.bind(this);
  }

  addEntity(entity: Entity): void {
    super.addEntity(entity);

    if (this.entities.size > 0) {
      this.setActive(true);
    }
  }

  removeEntity(entity: Entity): void {
    super.removeEntity(entity);
    
    if (this.entities.size === 0) {
      this.setActive(false);
    }
  }

  update(timeStamp: DOMHighResTimeStamp) {
    const dT = timeStamp - (this.prevTimeStamp ?? timeStamp);
    this.prevTimeStamp = timeStamp;
    
    this.componentSets.forEach(({ position, velocity }) => {
      position.x += velocity.x * dT;
      position.y += velocity.y * dT;
    });

    this.scene.draw();

    if (this.isActive)
      window.requestAnimationFrame(this.update);
  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
    if (isActive) {
      window.requestAnimationFrame(this.update);
    }
  }
}

export default MotionSystem;