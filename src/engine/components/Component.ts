import Entity from "engine/Entity";
import { ComponentId } from ".";

abstract class Component{
  static id: ComponentId;

  get id() {
    return (this.constructor as typeof Component).id
  }

  onInit(entity: Entity): void {}
  onDestroy(entity: Entity): void {}
}

export default Component;