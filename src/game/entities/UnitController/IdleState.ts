import { CursorEvent } from "engine/components";
import ControllerState, { ControllerPhase } from "./ControllerState";
import MovingState from "./MovingState";
import controllerStore, { pendingMoveDiscarded, unitSelected } from "shared/store";
import { PayloadAction } from "@reduxjs/toolkit";

class IdleState extends ControllerState {
  id = ControllerPhase.IDLE;

  onEnter(prevState): void {
    super.onEnter(prevState);

    controllerStore.dispatch(pendingMoveDiscarded(null));
    if (this.controller.selectedPiece) {
      this.controller.selectedPiece.resetPosition();
    }
    
    this.addStoreListener({
      type: "controller/unitSelected",
      effect: (action: PayloadAction) => {
        this.onUnitSelected();
      }
    });
  }

  onMouseDown(event: CursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    // show unit range
    if (unit) {
      controllerStore.dispatch(unitSelected(unit.id));
      this.setState(new MovingState());
      this.controller.currentState.onMouseDown(event);
    }
    else {
      this.startPanning();
    }
  }

  onUnitSelected() {
    this.setState(new MovingState());
  }
}

export default IdleState;