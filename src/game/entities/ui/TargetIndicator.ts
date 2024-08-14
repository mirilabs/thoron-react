import GameObject from "engine/GameObject";
import UnitPiece from "../UnitPiece";
import CombatTargetIcon from "icons/target_combat.svg";
import Scene from "engine/Scene";

const ICON_SCALE = 0.7;
const OFFSET_SCALE = {
  x: 0.2,
  y: -0.2
}

class TargetIndicator extends GameObject {
  offset: { x: number, y: number }

  constructor(unitPiece: UnitPiece) {
    super();

    const { tileWidth, tileHeight } = unitPiece.game.coords;

    const offset = {
      x: tileWidth * OFFSET_SCALE.x,
      y: tileHeight * OFFSET_SCALE.y
    }

    this.components = {
      position: {
        x: unitPiece.components.position.x + offset.x,
        y: unitPiece.components.position.y + offset.y
      },
      rectangle: {
        width: tileWidth * ICON_SCALE,
        height: tileHeight * ICON_SCALE
      },
      sprite: {
        url: CombatTargetIcon
      }
    }
  }
}

export default TargetIndicator;