import { IVector2 } from "@/engine/utils/Vector2";
import controllerStore, { itemSelected, targetSelected } from "@/shared/store";
import Chapter, { Command, DeployedUnit, ItemRecord } from "thoron";

class ActionController {
  chapter: Chapter;
  unit: DeployedUnit;
  action: Command;
  destination: IVector2;
  items: any[];
  targetIds: (string | number)[];

  constructor(
    chapter: Chapter,
    unit: DeployedUnit,
    destination: IVector2,
    action: Command
  ) {
    this.chapter = chapter;
    this.unit = unit;
    this.destination = destination;
    this.action = action;

    switch(action) {
      case "attack":
        this.items = unit.items.filter(item => item.type === "weapon");
        break;
      default:
        this.items = [];
    }
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
    let i = this.items.indexOf(this.getItem());
    
    // loop through items until we find one in range
    for (let j = 0; j < this.items.length; j++) {
      i = (i + 1) % this.items.length;
      
      if (this.isInRange(this.getTarget(), this.items[i])) {
        this.setItem(i);
        return;
      }
    }

    throw new Error("Current target is out of range for all items");
  }

  /**
   * Set the equipped item to the previous one for which the current target is
   * in range
   */
  selectPreviousItem() {
    let i = this.items.indexOf(this.getItem());

    // loop through items backwards until we find one in range
    for (let j = 0; j < this.items.length; j++) {
      i--;
      if (i < 0) i = this.items.length - 1;

      if (this.isInRange(this.getTarget(), this.items[i])) {
        this.setItem(i);
        return;
      }
    }

    throw new Error("Current target is out of range for all items");
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
    if (
      this.targetIds.length > 0 &&
      !this.targetIds.includes(this.getTargetId())
    ) {
      this.setTargetId(this.targetIds[0]);
    }
  }

  /**
   * Check if the target is within range of currently equipped item
   * @param target 
   * @param param1 min and max range overrides
   * @returns True if in range
   */
  isInRange(target: DeployedUnit, item: ItemRecord) {
    let range = target.getDistance(this.destination);
    return range >= item.stats.minRange &&
      range <= item.stats.maxRange;
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
    const target = this.getTarget();
    if (!target) return;

    // swap weapon if current one is out of range
    if (this.action === "attack") {
      const equipped = this.unit.items[this.unit.state.equippedIndex];
      if (!this.isInRange(target, equipped)) {
        this.selectNextItem();
      }
    }
  }

  /**
   * Item select callback
   */
  onItemSelected() {
    const item = this.getItem();

    
  }
}

export default ActionController;