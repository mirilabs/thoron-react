import Scene from "@/engine/Scene";
import {
  AnyComponent,
  ComponentId,
  Sprite
} from "../components";
import DrawSystem from "./DrawSystem";
import System from "./System";
import Entity from "@/engine/Entity";

class SpriteSystem extends System {
  drawSystem: DrawSystem;

  signature: Set<ComponentId> = new Set([
    'position',
    'rectangle',
    'sprite',
  ]);

  onMount(scene?: Scene): void {
    this.drawSystem = scene.drawSystem;
  }

  onComponentAdded(entity: Entity, component: AnyComponent): void {
    super.onComponentAdded(entity, component);

    if (component instanceof Sprite) {
      this.drawSystem.drawOrder.add(component);
    }
  }

  onComponentRemoved(entity: Entity, component: AnyComponent): void {
    super.onComponentRemoved(entity, component);

    if (component instanceof Sprite) {
      this.drawSystem.drawOrder.remove(component);
    }
  }
}

export default SpriteSystem;