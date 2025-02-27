import GameObject from "@/engine/GameObject";
import UnitPiece from "../UnitBody";
import CombatTargetIcon from "@/icons/target_combat.svg";
import Vector2 from "@/engine/utils/Vector2";
import MotionSequence from "@/engine/utils/MotionSequence";
import { Position, Rectangle, Sprite } from "@/engine/components";

const TOP_OFFSET = {
  x: 0.2,
  y: -0.4
}
const BOTTOM_OFFSET = {
  x: 0.2,
  y: -0.3
}
const SIZE = {
  width: 44,
  height: 44
}

class TargetIndicator extends GameObject {
  topPosition: Vector2;
  bottomPosition: Vector2;

  constructor(unitPiece: UnitPiece) {
    super();

    const { tileWidth, tileHeight } = unitPiece.game.coords;
    const position = unitPiece.entity.getComponent("position");

    this.topPosition = Vector2.sum(position, {
      x: TOP_OFFSET.x * tileWidth,
      y: TOP_OFFSET.y * tileHeight
    });
    this.bottomPosition = Vector2.sum(position, {
      x: BOTTOM_OFFSET.x * tileWidth,
      y: BOTTOM_OFFSET.y * tileHeight
    });

    this.components = [
      new Position(this.bottomPosition.x, this.bottomPosition.y),
      new Rectangle(SIZE.width, SIZE.height),
      new Sprite(CombatTargetIcon, 70)
    ]
  }

  onInit(): void {
    let path = new MotionSequence(this.entity);
    path.moveTo(this.topPosition, 1000);
    path.moveTo(this.bottomPosition, 1000);
    path.repeat();
  }
}

export default TargetIndicator;