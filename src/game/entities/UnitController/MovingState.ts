import ControllerState, { ControllerPhase } from "./ControllerState";
import { CursorEvent, Vector2 as IVector2 } from "engine/components";
import UnitPiece from "../UnitPiece";
import ActionSelectState from "./ActionSelectState";
import IdleState from "./IdleState";
import controllerStore, {
  destinationSelected,
  positionSelected
} from "shared/store";

class MovingState extends ControllerState {
  id = ControllerPhase.MOVING;
  
  unitEnt: UnitPiece;
  unit: any;
  entityPos: IVector2;

  lastX: number;
  lastY: number;
  dragging: boolean = false;

  onEnter(prevState: ControllerState) {
    this.unitEnt = this.controller.selectedPiece;
    this.unit = this.unitEnt.unit;

    this.entityPos = this.unitEnt.entity.getComponent('position');

    this.unitEnt.showMoveRange();
    this.unitEnt.showMovePath();
  }

  onExit(nextState: ControllerState): void {
    if (!(nextState instanceof ActionSelectState)) {
      this.unitEnt.hideMoveRange();
      this.unitEnt.hideMovePath();

      // hide all target indicators
      for (const unitPiece of this.controller.unitPieces.values()) {
        unitPiece.hideTargetIndicator();
      }
    }
  }

  moveEntity(x: number, y: number) {
    this.entityPos.x = x;
    this.entityPos.y = y;
    this.controller.scene.draw();
  }

  onMouseDown(event: CursorEvent): void {
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

  onMouseMove(event: CursorEvent): void {
    if (this.dragging) {
      this.onMouseDrag(event);
    }
  }

  onMouseDrag(event: CursorEvent): void {
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
    // update pathEnt with new target position
    let moveRange = this.unit.getMoveRange();
    
    if (moveRange.includes(nextCoords)) {
      this.unitEnt.setDestination(nextCoords);
      controllerStore.dispatch(positionSelected(nextCoords));
    }

    // update destination in store
    controllerStore.dispatch(destinationSelected(nextCoords));

    // update target indicators
    let maxAttackRange = this.unit.getMaxAttackRange();

    for (const unitEnt of this.controller.unitPieces.values()) {
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

  onMouseUp(event: CursorEvent) {
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