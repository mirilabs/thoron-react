import { Vector2 } from "engine/components";
import controllerStore, { itemSelected } from "shared/store";

class ActionController {
  chapter: any;
  unit: any;
  action: string;
  destination: Vector2;
  items: any[];
  targets: any[];

  constructor(
    chapter: any,
    unit: any,
    destination: Vector2,
    action: any
  ) {
    this.chapter = chapter;
    this.unit = unit;
    this.destination = destination;
    this.action = action;

    if (action === "attack") {
      this.items = unit.items.filter(item => item.weapon !== undefined);
    }
  }

  getSelectedItem() {
    let i = controllerStore.getState().pendingMove.itemIndex ??
      this.unit.state.equippedIndex;
    return this.unit.items[i];
  }

  selectNextItem() {
    let i = this.items.indexOf(this.getSelectedItem()) + 1;
    if (i >= this.items.length) i = 0;
    this.selectItem(i);
  }

  selectPreviousItem() {
    let i = this.items.indexOf(this.getSelectedItem()) - 1;
    if (i < 0) i = this.items.length - 1;
    this.selectItem(i);
  }

  selectItem(index: number) {
    controllerStore.dispatch(itemSelected(index));
    if (this.action === "attack") {
      this.unit.equip(index);
    }
  }

  selectNextTarget() {
    console.log("hi")
  }

  selectPreviousTarget() {

  }
}

export default ActionController;