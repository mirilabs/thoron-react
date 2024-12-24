import ControllerState, { ControllerPhase } from "./ControllerState";
import { IVector2 } from "engine/utils/Vector2";
import { ICursorEvent } from "engine/components/CursorEventHandler";
import UnitPiece from "../UnitBody";
import ActionSelectState from "./ActionSelectState";
import IdleState from "./IdleState";
import controllerStore, {
  destinationSelected,
  positionSelected
} from "shared/store";
import { DeployedUnit } from "thoron";

class MovingState extends ControllerState {
  id = ControllerPhase.MOVING;
  
  unit: DeployedUnit;
  unitEnt: UnitPiece;
  entityPos: IVector2;

  lastX: number;
  lastY: number;
  dragging: boolean = false;

  onEnter(prevState: ControllerState) {
    super.onEnter(prevState);

    this.unit = this.controller.chapter.getUnitById(
      controllerStore.getState().unitId
    );
    this.unitEnt = this.controller.getUnitBody(this.unit.id);

    this.entityPos = this.unitEnt.entity.getComponent("position");

    this.unitEnt.showMoveRange();
    this.unitEnt.showMovePath();
  }

  onExit(nextState: ControllerState): void {
    if (!(nextState instanceof ActionSelectState)) {
      this.unitEnt.hideMoveRange();
      this.unitEnt.hideMovePath();

      // hide all target indicators
      for (const unitPiece of this.controller.game.unitBodies.values()) {
        unitPiece.hideTargetIndicator();
      }
    }
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
    this.controller.scene.draw();
  }

  onMouseDown(event: ICursorEvent): void {
    let tileCoords = this.getTileCoords(event);
    let moveRange = this.unit.getMoveRange();

    if (moveRange.includes(tileCoords)) {
      // start moving unit if clicked within moveRange
      this.onMouseDrag(event);
      this.dragging = true;
    }
    else {
      // else return to idle state
      this.setState(new IdleState());
      this.controller.currentState.onMouseDown(event);
    }
  }

  onMouseMove(event: ICursorEvent): void {
    if (this.dragging) {
      this.onMouseDrag(event);
    }
  }

  onMouseDrag(event: ICursorEvent): void {
    // execute onTileChange if hovering over a new tile
    let tileCoords = this.getTileCoords(event);

    // if new tile is within move range, call onTileChange
    if (tileCoords.x !== this.lastX || tileCoords.y !== this.lastY) {
      this.onTileChange(tileCoords);
      this.lastX = tileCoords.x;
      this.lastY = tileCoords.y;
    }
    
    // unit sprite follows cursor
    this.moveEntity(
      event.x - this.controller.config.tileWidth / 2,
      event.y - this.controller.config.tileHeight / 2
    );
  }

  onTileChange(nextCoords: IVector2) {
    // ensure new position is in range
    let moveRange = this.unit.getMoveRange();
    if (!moveRange.includes(nextCoords)) return;

    // ensure new position is unoccupied
    let occupant = this.controller.chapter.getUnitAt(nextCoords);
    if (occupant && occupant !== this.unit) return;
    
    // update pathEnt with new target position
    this.unitEnt.setDestination(nextCoords);

    // update store
    controllerStore.dispatch(positionSelected(nextCoords));
    controllerStore.dispatch(destinationSelected(nextCoords));

    // update target indicators
    let maxAttackRange = this.unit.getMaxAttackRange();

    for (const unitEnt of this.controller.game.unitBodies.values()) {
      if (unitEnt === this.unitEnt) continue;
      
      let distance = unitEnt.unit.getDistance(nextCoords);

      if (distance <= maxAttackRange) {
        unitEnt.showTargetIndicator();
      }
      else {
        unitEnt.hideTargetIndicator();
      }
    }
  }

  onMouseUp(event: ICursorEvent) {
    if (this.unitEnt.pathEnt.hasLeftOrigin) {
      let targetPos = this.unitEnt.getDestination();
      let pixelCoords = this.controller.coords.toPixels(
        targetPos.x,
        targetPos.y
      );

      this.moveEntity(pixelCoords.x, pixelCoords.y);
      this.setState(new ActionSelectState());
    }
    else {
      this.unitEnt.resetPosition();
      this.controller.scene.draw();
    }

    this.dragging = false;
  }
}

export default MovingState;