import { IVector2 } from "@/engine/utils/Vector2";
import controllerStore, { itemSelected, targetSelected } from "@/shared/store";
import Chapter, { Command, DeployedUnit, ItemRecord } from "thoron";

class ActionController {
  chapter: Chapter;
  unit: DeployedUnit;
  action: Command;
  destination: IVector2;
  items: ItemRecord[];
  targetFilter: (unit: DeployedUnit) => boolean;
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

    switch (action) {
      case "attack":
        this.items = unit.items.filter(item => item.type === "weapon");
        break;
      case "staff":
        this.items = unit.items.filter(item => item.type === "staff");
        break;
      default:
        this.items = [];
    }

    this.targetFilter = (unit: DeployedUnit) => {
      return this.items.some(item => this.canTarget(unit, item));
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
    const target = this.getTarget();
    let i = this.items.indexOf(this.getItem());

    // loop through items until we find one that can target the current target
    for (let j = 0; j < this.items.length; j++) {
      i = (i + 1) % this.items.length;

      if (this.canTarget(target, this.items[i])) {
        this.setItem(this.unit.items.indexOf(this.items[i]));
        return;
      }
    }

    throw new Error("Current target cannot be targeted by any item");
  }

  /**
   * Set the equipped item to the previous one for which the current target is
   * in range
   */
  selectPreviousItem() {
    const target = this.getTarget();
    let i = this.items.indexOf(this.getItem());

    // loop through items backwards until we find one that can target
    for (let j = 0; j < this.items.length; j++) {
      i--;
      if (i < 0) i = this.items.length - 1;

      if (this.canTarget(target, this.items[i])) {
        this.setItem(this.unit.items.indexOf(this.items[i]));
        return;
      }
    }

    throw new Error("Current target cannot be targeted by any item");
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
  findTargets(item?: ItemRecord) {
    const filter = item
      ? (u: DeployedUnit) => this.canTarget(u, item)
      : this.targetFilter;

    const minRange = item ? item.stats.minRange : this.getMinRange();
    const maxRange = item ? item.stats.maxRange : this.getMaxRange();

    let targets = this.chapter.getUnitsInRange(
      this.destination,
      minRange,
      maxRange
    ).filter(filter);

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
  private isInRange(target: DeployedUnit, item: ItemRecord) {
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

    const item = this.getItem();
    if (!this.canTarget(target, item)) {
      this.selectNextItem();
    }
  }

  /**
   * Item select callback
   */
  onItemSelected() {
    this.findTargets(this.getItem());
  }

  private canTarget(target: DeployedUnit, item: ItemRecord) {
    if (!item || !target) return false;
    if (!this.isInRange(target, item)) return false;

    if (item.type === "weapon") {
      return this.filterDifferentTeam(target);
    }
    if (item.type === "staff") {
      const targetsAlly = item.stats.targetsAlly ?? true;
      return targetsAlly
        ? this.filterSameTeam(target)
        : this.filterDifferentTeam(target);
    }
    return false;
  }

  private filterDifferentTeam(unit: DeployedUnit) {
    return unit.getTeam() !== this.unit.getTeam();
  }

  private filterSameTeam(unit: DeployedUnit) {
    return unit.getTeam() === this.unit.getTeam() && unit !== this.unit;
  }

  private getMinRange() {
    return this.items.reduce((min, item) => {
      return Math.min(min, item.stats.minRange);
    }, 0);
  }

  private getMaxRange() {
    return this.items.reduce((max, item) => {
      return Math.max(max, item.stats.maxRange);
    }, 0);
  }
}

export default ActionController;