import {
  ComponentSet,
  ComponentId,
  Component
} from "../components";
import Entity, { EntityId } from "../Entity";
import Scene from "../Scene";

abstract class System {
  scene: Scene;
  
  // Set of components that this System cares about
  signature: Set<ComponentId> = new Set();

  // Set of Entities that this System holds references to
  // because they have all of the components in signature
  entities: Set<EntityId> = new Set();

  // Components that match signature and belong to tracked entities
  componentSets: ComponentSet[] = [];

  mount(scene: Scene) {
    this.scene = scene;
    this.onMount(scene);
  }

  onMount(scene?: Scene) {}

  unmount() {
    this.onUnmount(this.scene);
    delete this.scene;
  }

  onUnmount(scene?: Scene) {}

  /**
   * Callback for when a component is added to an entity. Starts tracking
   * the entity if its new signature matches this system's signature
   * @param entity 
   * @param componentId 
   */
  onComponentAdded(
    entity: Entity,
    componentId: ComponentId,
    component: Component
  ) {
    if (
      !this.entities.has(entity.id) &&
      this.signature.isSubsetOf(entity.signature)
    ) {
      this.addEntity(entity);
    }
  }
  
  /**
   * Callback for when a component is removed from an entity. Stops tracking
   * the entity if its new signature no longer matches this system's signature
   * @param entity 
   * @param componentId 
   */
  onComponentRemoved(
    entity: Entity,
    componentId: ComponentId
  ) {
    if (
      this.entities.has(entity.id) &&
      !this.signature.isSubsetOf(entity.signature)
    ) {
      this.removeEntity(entity);
    }
  }
  
  /**
   * Add an Entity and associated Components
   * @param entity 
   */
  addEntity(entity: Entity) {
    this.entities.add(entity.id);
    
    let componentSet = {};
    for (const componentId of this.signature) {
      let component = entity.getComponent(componentId as ComponentId);
      componentSet[componentId] = component;
    }
    this.componentSets.push(componentSet);
  }

  /**
   * Get the index of the entity (insertion order). This is the index at which
   * the entity's components are stored in this System
   * @param entityId 
   * @returns the index, or -1 if entity is not part of the system
   */
  getEntityIndex(entityId: EntityId) {
    let i: number = 0;
    for (const eId of this.entities) {
      if (eId === entityId) return i;
      i++;
    }
    return -1;
  }

  /**
   * Remove an entity and associated Components
   * @param entity 
   */
  removeEntity(entity: Entity) {
    let index = this.getEntityIndex(entity.id);
    if (index < 0) return;

    this.entities.delete(entity.id);
    this.componentSets.splice(index, 1);
  }

  /**
   * Get components associated with an entity that match this System's
   * signature
   * @param entity 
   * @returns An object with structure { [ComponentId]: Component }
   */
  getComponents(entity: Entity): ComponentSet {
    let i = this.getEntityIndex(entity.id);
    return this.componentSets[i];
  }
}

export default System;