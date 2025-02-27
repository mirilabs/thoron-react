import { ICursorEvent } from "@/engine/components/CursorEventHandler";
import ControllerState, { ControllerPhase } from "./ControllerState";
import MovingState from "./MovingState";
import controllerStore, {
  pendingMoveDiscarded,
  unitSelected
} from "@/shared/store";
import { DeployedUnit } from "thoron";

class IdleState extends ControllerState {
  id = ControllerPhase.IDLE;

  onEnter(prevState): void {
    super.onEnter(prevState);

    controllerStore.dispatch(pendingMoveDiscarded(null));
    if (this.controller.selectedUnitBody) {
      this.controller.selectedUnitBody.resetPosition();
    }
  }

  onMouseDown(event: ICursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let unit: DeployedUnit = this.controller.chapter.getUnitAt(tileCoords);

    if (unit) {
      // select clicked unit
      controllerStore.dispatch(unitSelected(unit.id));

      // if the select resulted in a change to MovingState, start dragging
      if (this.controller.currentState instanceof MovingState) {
        this.controller.currentState.onMouseDown(event);
      }
    }
    else {
      if (this.controller.selectedUnitBody) {
        this.controller.selectedUnitBody.hideMoveRange();
      }
      this.startPanning();
    }
  }
}

export default IdleState;