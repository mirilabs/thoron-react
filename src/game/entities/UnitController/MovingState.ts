import ControllerState from "./ControllerState";
import { CursorEvent, Vector2 as IVector2 } from "engine/components";
import UnitPath from "../ui/UnitPath";
import UnitPiece from "../UnitPiece";
import ActionSelectingState from "./ActionSelectingState";

class MovingState extends ControllerState {
  pathEnt: UnitPath;
  selectedPiece: UnitPiece;
  selectedUnit: any;
  entityPos: IVector2;

  lastX: number;
  lastY: number;

  onEnter(prevState: ControllerState) {
    const controller = this.controller;
    const scene = controller.scene;

    const { game, selectedPiece } = controller;
    this.selectedPiece = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    this.entityPos = this.selectedPiece.entity.getComponent('position');

    if (prevState instanceof ActionSelectingState) {
      // if path entity existed on previous state,
      // get its reference
      this.pathEnt = prevState.pathEnt;
    }
    else {
      // construct new moveRange and path entities
      this.selectedPiece.showMoveRange();
      
      this.pathEnt = new UnitPath(game, selectedPiece.unit);
      this.pathEnt.addToScene(scene);
      scene.draw();
    }
  }

  onExit(nextState: ControllerState): void {
    if (!(nextState instanceof ActionSelectingState)) {
      this.selectedPiece.hideMoveRange();
      this.pathEnt.destroy();

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
    this.onMouseMove(event);
  }

  onMouseMove(event: CursorEvent): void {
    // execute onTileChange if hovering over a new tile
    let tileCoords = this.getTileCoords(event);
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
    let moveRange = this.selectedUnit.getMoveRange();
    if (moveRange.includes(nextCoords)) {
      this.pathEnt.updateTargetPos(nextCoords);
      this.controller.uiEvents.emit("select_position", nextCoords);
    }

    // update target indicators
    let pos = this.pathEnt.getLastNode();
    let maxAttackRange = this.selectedUnit.getMaxAttackRange();

    for (const unitPiece of this.controller.unitPieces.values()) {
      if (unitPiece === this.selectedPiece) continue;
      
      let distance = unitPiece.unit.getDistance(pos);

      if (distance <= maxAttackRange) {
        unitPiece.showTargetIndicator();
      }
      else {
        unitPiece.hideTargetIndicator();
      }
    }
  }

  onMouseUp(event: CursorEvent) {
    let targetPos = this.pathEnt.getLastNode();
    let pixelCoords = this.controller.coords.toPixels(targetPos.x, targetPos.y);
    this.moveEntity(pixelCoords.x, pixelCoords.y);
    this.setState(new ActionSelectingState());
  }
}

export default MovingState;