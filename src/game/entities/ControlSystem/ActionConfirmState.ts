import UnitBody from "../UnitBody";
import ControllerState, { ControllerPhase } from "./ControllerState";
import UnitActionRange from "../ui/UnitActionRange";
import store, {
  targetSelected,
  actionSelected
} from "@/shared/store";
import ActionSelectState from "./ActionSelectState";
import ActionController from "./ActionController";
import Vector2 from "@/engine/utils/Vector2";
import { ICursorEvent } from "@/engine/components/CursorEventHandler";
import { DeployedUnit } from "thoron";

class ActionConfirmState extends ControllerState {
  id = ControllerPhase.ACTION_CONFIRM;

  selectedUnitBody: UnitBody;
  selectedUnit: DeployedUnit;
  actionRangeEnt: UnitActionRange;
  actionController: ActionController;

  getDest() {
    return store.getState().pendingMove.destination;
  }

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    const { game, selectedUnitBody, scene } = this.controller;
    this.selectedUnitBody = selectedUnitBody;
    this.selectedUnit = selectedUnitBody.unit;

    const { pendingMove } = store.getState();

    // show action range
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      pendingMove.destination,
      pendingMove.action
    );
    this.actionRangeEnt.addToScene(scene);

    // create actionController
    this.actionController = new ActionController(
      this.controller.chapter,
      this.selectedUnit,
      pendingMove.destination,
      pendingMove.action
    );

    // pass ui events to actionController
    this.addUIEventListener("left", () => {
      this.actionController.selectPreviousItem()
    });
    this.addUIEventListener("right", () => {
      this.actionController.selectNextItem()
    });
    this.addUIEventListener("down", () => {
      this.actionController.selectNextTarget();
    });
    this.addUIEventListener("up", () => {
      this.actionController.selectPreviousTarget();
    });
    this.addUIEventListener("cancel", this.onCancel);

    // listen for changes in pendingMove
    this.addStoreListener({
      type: "controller/targetSelected",
      effect: () => this.onTargetSelected()
    });
    this.addStoreListener({
      type: "controller/itemSelected",
      effect: () => this.onItemSelected()
    })

    this.actionController.findTargets();
  }

  onExit(nextState: ControllerState): void {
    super.onExit(nextState);

    this.actionRangeEnt.destroy();
    this.resetTargetIndicators();
  }

  onMouseDown(event: ICursorEvent): void {
    super.onMouseDown(event);

    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.getDest())) {
      // clicked on the acting unit (at destination tile)
      // return to ActionSelectState
      store.dispatch(targetSelected(null));
      store.dispatch(actionSelected(null));
      this.setState(new ActionSelectState());
    }
    else if (unit && unit !== this.selectedUnit) {
      // clicked on unit other than the selected one

      // if able to perform pending action on this target, select it
      const actions = this.selectedUnit.getPossibleActionsTo(
        this.getDest(),
        unit
      );
      if (actions.includes(this.actionController.action)) {
        store.dispatch(targetSelected(unit.id));
      }
    }
    else {
      // clicked outside of any unit
      this.startPanning();
    }
  }

  resetTargetIndicators() {
    for (const unitEnt of this.controller.game.unitBodies.values()) {
      unitEnt.hideTargetIndicator();
    }
  }

  onTargetSelected() {
    this.actionController.onTargetSelected();

    this.resetTargetIndicators();
    const target = this.actionController.getTarget();
    const action = this.actionController.action;
    if (target)
      this.controller.getUnitBody(target.id).showTargetIndicator(action);
  }

  onItemSelected() {
    this.actionController.onItemSelected();
  }

  onCancel() {
    store.dispatch(targetSelected(null));
    store.dispatch(actionSelected(null));
    this.setState(new ActionSelectState());
  }
}

export default ActionConfirmState;