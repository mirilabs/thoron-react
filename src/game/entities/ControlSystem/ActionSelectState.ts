import { ICursorEvent } from "@/engine/components/CursorEventHandler";
import UnitPiece from "../UnitBody";
import ControllerState, { ControllerPhase } from "./ControllerState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import controllerStore, { targetSelected, actionSelected } from "@/shared/store";
import ActionConfirmState from "./ActionConfirmState";
import { Command, DeployedUnit } from "thoron";

class ActionSelectState extends ControllerState {
  id = ControllerPhase.ACTION_SELECT;
  unitEnt: UnitPiece;

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    this.unitEnt = this.controller.selectedUnitBody;
    this.unitEnt.showMoveRange();
    this.unitEnt.showMovePath();

    // reset selected action state
    controllerStore.dispatch(actionSelected(null));

    // wait for user to select action in ui
    this.addUIEventListener("select_action", this.onActionSelected);
    this.addUIEventListener("cancel", this.onCancel);

    // show target indicators for potential actions from this position
    const { destination } = controllerStore.getState().pendingMove;
    this.updateTargetIndicators(destination);
  }

  onExit(nextState: ControllerState) {
    super.onExit(nextState);

    if (
      nextState instanceof ActionConfirmState ||
      nextState instanceof IdleState
    ) {
      this.unitEnt.hideMoveRange();
      this.unitEnt.hideMovePath();

      for (const unitPiece of this.controller.game.unitBodies.values()) {
        unitPiece.hideTargetIndicator();
      }
    }
  }

  onMouseDown(event: ICursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let target = this.controller.chapter.getUnitAt(tileCoords);
    let possibleActions = this.unitEnt.unit.getPossibleActionsTo(
      controllerStore.getState().pendingMove.destination,
      target
    );

    if (target && target !== this.unitEnt.unit) {
      // clicked on a target
      if (possibleActions.length === 0) {
        // if no actions on this target are possible, do nothing
        return;
      }
      else if (
        possibleActions.length === 1 &&
        ["attack", "staff"].includes(possibleActions[0])
      ) {
        // if only one action on this target is possible,
        // and that action is attack or staff,
        // select it by default
        controllerStore.dispatch(actionSelected(possibleActions[0]));
        this.setState(new ActionConfirmState())
      }

      // ActionSelectMenu shows possible actions to selected target
      controllerStore.dispatch(targetSelected(target.id));
    }
    else if (this.unitEnt.unit.getMoveRange().includes(tileCoords)) {
      // clicked on a tile in move range
      this.setState(new MovingState());

      // pass mousedown event to next state
      this.controller.currentState.onMouseDown(event);
    }
    else {
      // clicked outside of move range
      this.startPanning();
    }
  }

  onActionSelected(action: Command | "cancel") {
    if (action === "cancel") {
      this.onCancel();
    }
    else if (action === "wait") {
      this.setState(new IdleState());
    }
    else {
      this.setState(new ActionConfirmState());
    }
  }

  onCancel() {
    this.setState(new IdleState());
  }

  onUnitSelected(unit: DeployedUnit): void {
    if (unit !== this.unitEnt.unit) {
      this.setState(new IdleState())
    }
  }
}

export default ActionSelectState;