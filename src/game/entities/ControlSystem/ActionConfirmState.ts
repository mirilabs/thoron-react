import UnitBody from "../UnitBody";
import ControllerState, { ControllerPhase } from "./ControllerState";
import UnitActionRange from "../ui/UnitActionRange";
import store, {
  targetSelected,
  actionSelected
} from "shared/store";
import ActionSelectState from "./ActionSelectState";
import ActionController from "./ActionController";
import Vector2 from "engine/utils/Vector2";
import { CursorEvent } from "engine/components";

class ActionConfirmState extends ControllerState {
  id = ControllerPhase.ACTION_CONFIRM;

  unitEnt: UnitBody;
  selectedUnit: any;
  actionRangeEnt: UnitActionRange;
  actionController: ActionController;

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
    this.addUIEventListener("left", () => this.actionController.selectPreviousItem());
    this.addUIEventListener("right", () => this.actionController.selectNextItem())
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

    this.actionController.findTargets();
  }

  onExit(nextState: ControllerState): void {
    super.onExit(nextState);
    
    this.actionRangeEnt.destroy();
    this.resetTargetIndicators();
  }

  onMouseDown(event: CursorEvent): void {
    super.onMouseDown(event);
    
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.getDest())) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      store.dispatch(targetSelected(unit.id));
    }
    else {
      this.startPanning();
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
    if (target)
      this.controller.getUnitBody(target).showTargetIndicator();
  }

  onCancel() {
    store.dispatch(targetSelected(null));
    store.dispatch(actionSelected(null));
    this.setState(new ActionSelectState());
  }
}

export default ActionConfirmState;