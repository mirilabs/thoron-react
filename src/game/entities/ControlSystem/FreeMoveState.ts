import ControllerState, { ControllerPhase } from "./ControllerState";
import { IVector2 } from "@/engine/utils/Vector2";
import { ICursorEvent } from "@/engine/components/CursorEventHandler";
import IdleState from "./IdleState";
import controllerStore, {
  destinationSelected,
  positionSelected
} from "@/shared/store";
import { DeployedUnit } from "thoron";
import UnitBody from "../UnitBody";

class FreeMoveState extends ControllerState {
  id = ControllerPhase.MOVING;

  unit: DeployedUnit;
  unitBody: UnitBody;
  entityPos: IVector2;

  lastX: number;
  lastY: number;
  dragging: boolean = false;

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    this.unit = this.controller.chapter.getUnitById(
      controllerStore.getState().unitId
    );
    this.unitBody = this.controller.getUnitBody(this.unit.id);
    this.entityPos = this.unitBody.entity.getComponent("position");

    this.unitBody.showMovePath();
    this.dragging = true;
  }

  onExit(nextState: ControllerState): void {
    // ensure everything is hidden if we leave this state
    this.unitBody.hideMovePath();
    this.unitBody.hideMoveRange();
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
    this.controller.scene.draw();
  }

  onMouseDown(event: ICursorEvent): void {
    this.onMouseDrag(event);
    this.dragging = true;
  }

  onMouseMove(event: ICursorEvent): void {
    if (this.dragging) {
      this.onMouseDrag(event);
    }
  }

  onMouseDrag(event: ICursorEvent): void {
    let tileCoords = this.getTileCoords(event);

    if (tileCoords.x !== this.lastX || tileCoords.y !== this.lastY) {
      this.onTileChange(tileCoords);
      this.lastX = tileCoords.x;
      this.lastY = tileCoords.y;
    }

    this.moveEntity(
      event.x - this.controller.config.tileWidth / 2,
      event.y - this.controller.config.tileHeight / 2
    );
  }

  onTileChange(nextCoords: IVector2) {
    let occupant = this.controller.chapter.getUnitAt(nextCoords);
    if (occupant && occupant !== this.unit) return;

    this.unitBody.setDestination(nextCoords);

    controllerStore.dispatch(positionSelected(nextCoords));
    controllerStore.dispatch(destinationSelected(nextCoords));
  }

  onMouseUp(event: ICursorEvent) {
    if (this.unitBody.pathEnt.hasLeftOrigin) {
      const gameController = this.controller.game.gameController;
      let targetPos = this.unitBody.getDestination();

      // Update underlying state. 
      // We use pushActionResult directly with a move event
      // to bypass range checks.
      gameController.pushActionResult({
        action: { command: "move" } as any,
        status: "success",
        events: [{
          unitId: this.unit.id,
          type: "move",
          startPos: this.unit.getPosition(),
          endPos: targetPos
        }],
        rngState: gameController.rng.state()
      });

      let pixelCoords = this.controller.coords.toPixels(
        targetPos.x,
        targetPos.y
      );
      this.moveEntity(pixelCoords.x, pixelCoords.y);
    }
    else {
      this.unitBody.resetPosition();
      this.controller.scene.draw();
    }

    this.dragging = false;
    this.setState(new IdleState());
  }
}

export default FreeMoveState;
