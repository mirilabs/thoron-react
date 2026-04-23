import { IVector2 } from "@/engine/utils/Vector2";
import controllerStore, { itemSelected, targetSelected } from "@/shared/store";
import Chapter, { Command, DeployedUnit, ItemRecord } from "thoron";

class ActionController {
  chapter: Chapter;
  unit: DeployedUnit;
  action: Command;
  destination: IVector2;
  items: ItemRecord[];
  targetIds: (string | number)[];
  targetFilter: (unit: DeployedUnit) => boolean;
  minRange: number;
  maxRange: number;
  unitTeam: number;

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

    this.targetFilter = this.getTargetFilter();
    this.minRange = this.calculateMinRange();
    this.maxRange = this.calculateMaxRange();
    this.unitTeam = unit.getTeam();
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

      if (this.canUseItemOnTarget(this.items[i], target)) {
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

      if (this.canUseItemOnTarget(this.items[i], target)) {
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
  findTargets() {
    const targets = this.chapter.getUnitsInRange(
      this.destination,
      this.minRange,
      this.maxRange
    ).filter(this.targetFilter);

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
    const item = this.getItem();
    let i = this.targetIds.indexOf(this.getTargetId());

    for (let j = 0; j < this.targetIds.length; j++) {
      i++;
      if (i >= this.targetIds.length) i = 0;

      const target = this.chapter.getUnitById(this.targetIds[i]);
      if (!target) continue;

      if (this.canUseItemOnTarget(item, target)) {
        this.setTargetId(this.targetIds[i]);
        return;
      }
    }

    throw new Error("No valid targets found for current item");
  }

  /**
   * Change selected target to previous
   */
  selectPreviousTarget() {
    const item = this.getItem();
    let i = this.targetIds.indexOf(this.getTargetId());

    for (let j = 0; j < this.targetIds.length; j++) {
      i--;
      if (i < 0) i = this.targetIds.length - 1;

      const target = this.chapter.getUnitById(this.targetIds[i]);
      if (!target) continue;

      if (this.canUseItemOnTarget(item, target)) {
        this.setTargetId(this.targetIds[i]);
        return;
      }
    }

    throw new Error("No valid targets found for current item");
  }

  /**
   * Target select callback
   */
  onTargetSelected() {
    const item = this.getItem();
    const target = this.getTarget();
    if (!target) return;

    if (!this.canUseItemOnTarget(item, target)) {
      this.selectNextItem();
    }
  }

  /**
   * Item select callback
   */
  onItemSelected() {
    const item = this.getItem();
    const target = this.getTarget();

    if (!this.canUseItemOnTarget(item, target)) {
      this.selectNextTarget();
    }
  }

  private canUseItemOnTarget(
    item: ItemRecord = this.getItem(),
    target: DeployedUnit = this.getTarget()
  ) {
    if (!target) return false;
    if (target.id === this.unit.id) return false;
    if (!this.isInRange(target, item)) return false;

    switch (item.type) {
      case "weapon":
        return this.isDifferentTeam(target);
      case "staff":
        return item.stats.targetsAlly ?
          this.isSameTeam(target) :
          this.isDifferentTeam(target);
      default:
        return false;
    }
  }

  private getTargetFilter(): (unit: DeployedUnit) => boolean {
    switch (this.action) {
      case "attack":
        return (unit: DeployedUnit) => this.isDifferentTeam(unit);
      case "staff":
        const canTargetAlly = this.unit.canStaffAlly();
        const canTargetEnemy = this.unit.canStaffEnemy();
        return (unit: DeployedUnit) => {
          return this.isSameTeam(unit) ? canTargetAlly : canTargetEnemy;
        };
      default:
        return () => false;
    }
  }

  private isDifferentTeam(unit: DeployedUnit) {
    return unit.getTeam() !== this.unitTeam;
  }

  private isSameTeam(unit: DeployedUnit) {
    return unit.getTeam() === this.unitTeam;
  }

  private calculateMinRange() {
    if (this.items.length === 0) return 0;
    return this.items.reduce((min, item) => {
      return Math.min(min, item.stats.minRange);
    }, Infinity);
  }

  private calculateMaxRange() {
    return this.items.reduce((max, item) => {
      return Math.max(max, item.stats.maxRange);
    }, 0);
  }
}

export default ActionController;