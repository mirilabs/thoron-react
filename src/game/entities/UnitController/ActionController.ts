import { addListener, UnsubscribeListener } from "@reduxjs/toolkit";
import { Vector2 } from "engine/components";
import controllerStore, { itemSelected, targetSelected } from "shared/store";
import Chapter, { DeployedUnit } from "thoron";

class ActionController {
  chapter: Chapter;
  unit: DeployedUnit;
  action: string;
  destination: Vector2;
  items: any[];
  targetIds: (string | number)[];

  removeTargetListener: UnsubscribeListener;
  removeItemListener: UnsubscribeListener;

  constructor(
    chapter: Chapter,
    unit: DeployedUnit,
    destination: Vector2,
    action: any
  ) {
    this.chapter = chapter;
    this.unit = unit;
    this.destination = destination;
    this.action = action;

    if (action === "attack") {
      this.items = unit.items.filter(item => item.type === "weapon");
    }

    this.findTargets();
    
    // listen for changes in pendingMove
    this.removeTargetListener = controllerStore.dispatch(addListener({
      type: "controller/targetSelected",
      effect: () => this.onTargetSelected()
    }));
  }

  /**
   * Remove store subscriptions
   */
  cleanup() {
    this.removeTargetListener();
  }

  /**
   * Get the currently equipped item
   * @returns item
   */
  getItem() {
    let i = controllerStore.getState().pendingMove.itemIndex ??
      this.unit.state.equippedIndex;
    return this.unit.items[i];
  }

  /**
   * Set the currently equipped item
   * @param index Item index in selected unit's inventory
   */
  setItem(index: number) {
    controllerStore.dispatch(itemSelected(index));
    if (this.action === "attack") {
      this.unit.equip(index);
    }
  }

  /**
   * Set the equipped item to the next one for which the current target is
   * in range
   */
  selectNextItem() {
    let i = this.items.indexOf(this.getItem()) + 1;
    if (i >= this.items.length) i = 0;
    this.setItem(i);

    // if not in range, skip this item
    if (!this.isInEquippedRange(this.getTarget()))
      this.selectNextItem();
  }

  /**
   * Set the equipped item to the previous one for which the current target is
   * in range
   */
  selectPreviousItem() {
    let i = this.items.indexOf(this.getItem()) - 1;
    if (i < 0) i = this.items.length - 1;
    this.setItem(i);

    if (!this.isInEquippedRange(this.getTarget()))
      this.selectPreviousItem();
  }

  /**
   * 
   * @returns id of the current target
   */
  getTargetId() {
    let id = controllerStore.getState().pendingMove.targetId;
    return id;
  }

  /**
   * 
   * @returns current target unit
   */
  getTarget(): DeployedUnit {
    return this.chapter.getUnitById(this.getTargetId());
  }

  /**
   * Set the current target
   * @param id target id
   */
  setTargetId(id: number | string) {
    controllerStore.dispatch(targetSelected(id));
  }

  /**
   * Get list of valid target ids according to attack range
   */
  findTargets() {
    let targets = this.chapter.getUnitsInRange(
      this.destination,
      this.unit.getMinAttackRange(),
      this.unit.getMaxAttackRange()
    ).filter(unit => unit.getTeam() !== this.unit.getTeam())

    this.targetIds = targets.map(unit => unit.id);

    // set default target
    if (!this.targetIds.includes(this.getTargetId())) {
      this.setTargetId(this.targetIds[0]);
    }
  }

  /**
   * Check if the target is within range of currently equipped item
   * @param target 
   * @returns True if in range
   */
  isInEquippedRange(target: DeployedUnit) {
    let range = target.getDistance(this.destination);
    return range >= this.unit.equipped.minRange &&
      range <= this.unit.equipped.maxRange;
  }

  /**
   * Change selected target to next
   */
  selectNextTarget() {
    let i = this.targetIds.indexOf(this.getTargetId()) + 1;
    if (i >= this.targetIds.length) i = 0;
    this.setTargetId(this.targetIds[i]);
  }

  /**
   * Change selected target to previous
   */
  selectPreviousTarget() {
    let i = this.targetIds.indexOf(this.getTargetId()) - 1;
    if (i < 0) i = this.targetIds.length - 1;
    this.setTargetId(this.targetIds[i]);
  }

  /**
   * Target select callback
   */
  onTargetSelected() {
    // swap weapon if current one is out of range
    if (!this.isInEquippedRange(this.getTarget()))
      this.selectNextItem();
  }
}

export default ActionController;