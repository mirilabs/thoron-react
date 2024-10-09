import Vector2 from "engine/utils/Vector2";
import UnitPiece from "../UnitPiece";
import ControllerState, { ControllerPhase } from "./ControllerState";
import { Vector2 as IVector2 } from "engine/components";
import UnitActionRange from "../ui/UnitActionRange";
import IdleState from "./IdleState";
import store, { targetSelected } from "shared/store";
import controllerStore from "shared/store";

class TargetSelectState extends ControllerState {
  id = ControllerPhase.TARGET_SELECT;

  unitEnt: UnitPiece;
  selectedUnit: any;
  actionRangeEnt: UnitActionRange;

  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
  }

  onEnter(prevState: ControllerState) {
    const { game, selectedPiece, scene } = this.controller;
    this.unitEnt = selectedPiece;
    this.selectedUnit = selectedPiece.unit;

    // wait for attack to be selected
    this.controller.uiEvents.on("cancel", this.cancel);
    
    this.actionRangeEnt = new UnitActionRange(
      game,
      this.selectedUnit,
      store.getState().destination
    );
    this.actionRangeEnt.addToScene(scene);
    scene.draw();
  }

  onExit(prevState: ControllerState): void {
    this.controller.uiEvents.off("cancel", this.cancel);
    this.actionRangeEnt.destroy();
  }

  onMouseDown(event: IVector2): void {
    let tileCoords = this.controller.coords.toTiles(event.x, event.y);
    let unit = this.controller.chapter.getUnitAt(tileCoords);

    if (Vector2.eq(tileCoords, store.getState().destination)) {
      console.log(this.controller);
    }
    else if (unit && unit !== this.selectedUnit) {
      controllerStore.dispatch(targetSelected(unit.id));
    }
    else {
      this.cancel();
    }
  }

  cancel() {
    // return to original position
    this.unitEnt.resetPosition();

    // reset state
    this.setState(new IdleState());
  }
}

export default TargetSelectState;