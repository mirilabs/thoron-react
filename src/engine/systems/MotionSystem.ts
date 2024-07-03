import { Component, ComponentId } from "../components";
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

  onComponentAdded(
    entity: Entity,
    componentId: ComponentId,
    component: Component
  ): void {
    super.onComponentAdded(entity, componentId, component);

    if (this.entities.size > 0) {
      this.setActive(true);
    }
  }

  onComponentRemoved(entity: Entity, componentId: ComponentId): void {
    super.onComponentRemoved(entity, componentId);

    if (this.entities.size === 0) {
      this.setActive(false);
    }
  }

  update(timeStamp: DOMHighResTimeStamp) {
    const dT = timeStamp - (this.prevTimeStamp ?? timeStamp);
    this.prevTimeStamp = timeStamp;
    
    this.components.forEach(({ position, velocity }) => {
      position.x += velocity.x * dT;
      position.y += velocity.y * dT;
    });

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