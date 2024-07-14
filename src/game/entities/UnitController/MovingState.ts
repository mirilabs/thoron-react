import ControllerState from "./ControllerState";
import { CursorEvent, Vector2 } from "engine/components";
import UnitRange from "../ui/UnitMoveRange";
import UnitPath from "../ui/UnitPath";
import UnitPiece from "../UnitPiece";
import ActionSelectingState from "./ActionSelectingState";

class MovingState extends ControllerState {
  moveRangeEnt: UnitRange;
  pathEnt: UnitPath;
  
  selectedPiece: UnitPiece;
  selectedUnit: any;
  entityPos: Vector2;

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
      // if moveRange and path entities existed on previous state,
      // get their references
      this.moveRangeEnt = prevState.moveRangeEnt;
      this.pathEnt = prevState.pathEnt;
    }
    else {
      // construct new moveRange and path entities
      this.moveRangeEnt = new UnitRange(game, selectedPiece.unit);
      this.moveRangeEnt.addToScene(scene);
      
      this.pathEnt = new UnitPath(game, selectedPiece.unit);
      this.pathEnt.addToScene(scene);
      scene.draw();
    }
    
    this.controller.uiEvents.emit("open_action_menu");
  }

  onExit(nextState: ControllerState): void {
    if (!(nextState instanceof ActionSelectingState)) {
      this.moveRangeEnt.destroy();
      this.pathEnt.destroy();
      this.controller.uiEvents.emit("open_action_menu");
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

  onTileChange(nextCoords: Vector2) {
    // update pathEnt with new target position
    let range = this.selectedUnit.getMoveRange();
    if (range.includes(nextCoords)) {
      this.pathEnt.updateTargetPos(nextCoords);
    }

    // update ui with new targetPos
    let targetPos = this.pathEnt.getLastNode();
    this.controller.uiEvents.emit("select_position", targetPos);
  }

  onMouseUp(event: CursorEvent) {
    let targetPos = this.pathEnt.getLastNode();
    let pixelCoords = this.controller.coords.toPixels(targetPos.x, targetPos.y);
    this.moveEntity(pixelCoords.x, pixelCoords.y);
    this.setState(new ActionSelectingState());
  }
}

export default MovingState;