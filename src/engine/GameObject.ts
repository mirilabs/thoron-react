import Entity from "./Entity";
import Scene from "./Scene";
import {
  ComponentSet,
  ComponentId
} from "./components";

abstract class GameObject {
  components: ComponentSet;
  entity: Entity;

  addToScene(scene: Scene): Entity {
    let entity = scene.createEntity();

    for (const cId in this.components) {
      const component = this.components[cId];
      entity.addComponent(cId as ComponentId, component);
    }

    this.entity = entity;
    return entity;
  }

  destroy() {
    if (!this.entity) return;
    
    this.entity.destroy();
    delete this.entity;
  }
}

export default GameObject;