import Vector2 from "engine/utils/Vector2";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import { Vector2 as IVector2 } from "engine/components";
import UnitActionRange from "../ui/UnitActionRange";
import store, { targetSelected, actionSelected } from "shared/store";
import PanningState from "./PanningState";
import ActionSelectState from "./ActionSelectState";

class ActionConfirmState extends ControllerState {
  id = ControllerPhase.ACTION_CONFIRM;

  unitEnt: UnitPiece;
  selectedUnit: any;
  actionRangeEnt: UnitActionRange;

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    const { game, selectedPiece, scene } = this.controller;
    this.unitEnt = selectedPiece;
    this.selectedUnit = selectedPiece.unit;
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      store.getState().destination
    );
    this.actionRangeEnt.addToScene(scene);

    this.bindUIEvent("cancel", this.onCancel);
  }

  onExit(nextState: ControllerState): void {
    super.onExit(nextState);

    this.actionRangeEnt.destroy();
  }

  onMouseDown(event: IVector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, store.getState().destination)) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      store.dispatch(targetSelected(unit.id));
    }
    else {
      this.setState(new PanningState())
    }
  }

  cycleItemBack() {}
  cycleItemForward() {}
  cycleTargetBack() {}
  cycleTargetForward() {}

  onCancel() {
    store.dispatch(actionSelected(null))
    this.setState(new ActionSelectState());
  }
}

export default ActionConfirmState;