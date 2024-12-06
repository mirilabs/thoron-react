import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import UnitActionRange from "../ui/UnitActionRange";
import store, {
  targetSelected,
  actionSelected
} from "shared/store";
import PanningState from "./PanningState";
import ActionSelectState from "./ActionSelectState";
import ActionController from "./ActionController";
import { addListener, UnsubscribeListener } from "@reduxjs/toolkit";
import controllerStore from "shared/store";
import Vector2 from "engine/utils/Vector2";

class ActionConfirmState extends ControllerState {
  id = ControllerPhase.ACTION_CONFIRM;

  unitEnt: UnitPiece;
  selectedUnit: any;
  actionRangeEnt: UnitActionRange;
  actionController: ActionController;
  removeTargetListener: UnsubscribeListener;

  getDest() {
    return store.getState().pendingMove.destination;
  }

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    const { game, selectedPiece, scene } = this.controller;
    this.unitEnt = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    const { pendingMove } = store.getState();
    
    // show action range
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      pendingMove.destination
    );
    this.actionRangeEnt.addToScene(scene);

    // create actionController
    this.actionController = new ActionController(
      this.controller.chapter,
      this.unitEnt.unit,
      pendingMove.destination,
      pendingMove.action
    );

    // pass ui events to actionController
    this.bindUIEvent("left", () => this.actionController.selectPreviousItem());
    this.bindUIEvent("right", () => this.actionController.selectNextItem())
    this.bindUIEvent("down", () => {
      this.actionController.selectNextTarget();
    });
    this.bindUIEvent("up", () => {
      this.actionController.selectPreviousTarget();
    });
    this.bindUIEvent("cancel", this.onCancel);

    // listen for changes in pendingMove
    this.removeTargetListener = controllerStore.dispatch(addListener({
      type: "controller/targetSelected",
      effect: () => this.onTargetSelected()
    }));

    this.actionController.findTargets();
  }

  onExit(nextState: ControllerState): void {
    super.onExit(nextState);

    this.actionRangeEnt.destroy();
    this.removeTargetListener();
    this.resetTargetIndicators();
  }

  onMouseDown(event: Vector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.getDest())) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      store.dispatch(targetSelected(unit.id));
    }
    else {
      this.setState(new PanningState())
    }
  }

  resetTargetIndicators() {
    for (const unitEnt of this.controller.unitPieces.values()) {
      unitEnt.hideTargetIndicator();
    }
  }

  onTargetSelected() {
    this.actionController.onTargetSelected();
    
    this.resetTargetIndicators();
    let target = this.actionController.getTarget();
    this.controller.getUnitPiece(target).showTargetIndicator();
  }

  onCancel() {
    store.dispatch(targetSelected(null));
    store.dispatch(actionSelected(null));
    this.setState(new ActionSelectState());
  }
}

export default ActionConfirmState;