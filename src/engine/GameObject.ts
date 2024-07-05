import Entity from "./Entity";
import Scene from "./Scene";
import {
  ComponentSet,
  ComponentId
} from "./components";

abstract class GameObject {
  components: ComponentSet = {};
  entity: Entity;

  onInit(scene: Scene) {}
  onDestroy() {}

  addToScene(scene: Scene): Entity {
    let entity = scene.createEntity();

    for (const cId in this.components) {
      const component = this.components[cId];
      entity.addComponent(cId as ComponentId, component);
    }

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