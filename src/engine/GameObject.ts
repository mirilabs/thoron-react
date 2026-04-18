import Entity from "./Entity";
import Scene from "./Scene";
import type {
  AnyComponent
} from "./components";

abstract class GameObject {
  components: AnyComponent[] = [];
  entity: Entity;

  onInit(scene: Scene) { }
  onDestroy() { }

  addToScene(scene: Scene): Entity {
    if (!scene) {
      throw new Error("Scene does not exist");
    }
    if (this.entity) {
      throw new Error("GameObject is already in a scene");
    }
    this.entity = scene.createEntity();
    this.entity.addComponents(this.components);
    this.onInit(scene);
    return this.entity;
  }

  destroy() {
    if (!this.entity) return;

    this.entity.destroy();
    this.onDestroy();
    delete this.entity;
  }
}

export default GameObject;