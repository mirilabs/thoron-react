import Entity from "./Entity";
import Scene from "./Scene";
import {
  AnyComponent
} from "@/app";

abstract class GameObject {
  components: AnyComponent[] = [];
  entity: Entity;

  onInit(scene: Scene) {}
  onDestroy() {}

  addToScene(scene: Scene): Entity {
    let entity = scene.createEntity();

    this.components.forEach(c => entity.addComponent(c));

    this.entity = entity;
    this.onInit(scene);
    return entity;
  }

  destroy() {
    if (!this.entity) return;
    
    this.entity.destroy();
    this.onDestroy();
    delete this.entity;
  }
}

export default GameObject;