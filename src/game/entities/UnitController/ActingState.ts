import Vector2 from "engine/utils/Vector2";
import UnitPiece from "../UnitPiece";
import ControllerState from "./ControllerState";
import { Vector2 as IVector2 } from "engine/components";
import UnitActionRange from "../ui/UnitActionRange";
import IdleState from "./IdleState";

class ActingState extends ControllerState {
  unitEnt: UnitPiece;
  selectedUnit: any;
  moveTarget: IVector2;  // coords from which the unit will attack
  action: string;
  actionRangeEnt: UnitActionRange;

  constructor(moveTarget: IVector2, action: string) {
    super();
    this.moveTarget = moveTarget;
    this.action = action;
  }

  onEnter(prevState: ControllerState) {
    const { game, selectedPiece, scene } = this.controller;
    this.unitEnt = selectedPiece;
    this.selectedUnit = selectedPiece.unit;
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      this.moveTarget
    );
    this.actionRangeEnt.addToScene(scene);
    scene.draw();
  }

  onExit(prevState: ControllerState): void {
    this.actionRangeEnt.destroy();
  }

  onMouseDown(event: IVector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, this.moveTarget)) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      console.log(unit);
    }
    else {
      // return to original position
      let { x, y } = this.selectedUnit.getPosition();
      let originalPos = this.controller.coords.toPixels(x, y);
      this.unitEnt.rect.moveTo(originalPos.x, originalPos.y);

      // reset state
      this.setState(new IdleState());
    }
  }
}

export default ActingState;