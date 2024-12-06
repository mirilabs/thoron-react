import Vector2 from "engine/utils/Vector2";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import { Vector2 as IVector2 } from "engine/components";
import UnitActionRange from "../ui/UnitActionRange";
import store, {
  targetSelected,
  pendingMoveDiscarded
} from "shared/store";
import PanningState from "./PanningState";
import ActionSelectState from "./ActionSelectState";
import ActionController from "./ActionController";

class ActionConfirmState extends ControllerState {
  id = ControllerPhase.ACTION_CONFIRM;

  unitEnt: UnitPiece;
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
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      pendingMove.destination
    );
    this.actionRangeEnt.addToScene(scene);

    this.actionController = new ActionController(
      this.controller.chapter,
      this.unitEnt.unit,
      pendingMove.destination,
      pendingMove.action
    );

    // TODO if no target is selected, pick one

    this.bindUIEvent("left", () => this.actionController.selectPreviousItem());
    this.bindUIEvent("right", () => this.actionController.selectNextItem())
    this.bindUIEvent("down", () => {
      this.actionController.selectNextTarget();
    });
    this.bindUIEvent("up", () => {
      this.actionController.selectPreviousTarget();
    });
    this.bindUIEvent("cancel", this.onCancel);
  }

  onExit(nextState: ControllerState): void {
    super.onExit(nextState);

    this.actionRangeEnt.destroy();
  }

  onMouseDown(event: IVector2): void {
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

  onCancel() {
    store.dispatch(pendingMoveDiscarded(null))
    this.setState(new ActionSelectState());
  }
}

export default ActionConfirmState;