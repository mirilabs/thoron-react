import Game from "game/Game";
import UnitBody from "../UnitBody";
import { AttackEvent } from "thoron";
import MotionSequence from "engine/utils/MotionSequence";
import Vector2 from "engine/utils/Vector2";
import DamageNumber from "../ui/DamageNumber";

const MOTION_SCALE = 0.3; // 1.0 = one tile width
const FORWARD_MOTION_TIME = 120;  // ms
const BACKWARD_MOTION_TIME = 80;  // ms
const POST_ATTACK_DELAY_TIME = 500;  // ms

function wait(time: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, time);
  })
}

function AttackMotion(
  game: Game,
  attacker: UnitBody,
  target: UnitBody,
  event: AttackEvent
) {
  let startingPos = Vector2.copy(attacker.entity.getComponent("position"));
  let direction = Vector2.difference(
    target.entity.getComponent("position"),
    startingPos
  );
  direction = Vector2.normalize(direction);
  direction = Vector2.scale(direction, game.config.tileWidth * MOTION_SCALE);

  let dest = Vector2.sum(startingPos, direction);

  const path = new MotionSequence(attacker.entity);
  path.moveTo(dest, FORWARD_MOTION_TIME);
  path.moveTo(startingPos, BACKWARD_MOTION_TIME);

  return async function attackMotion() {
    window.setTimeout(() => {
      let origin = Vector2.scale({
        x: game.config.tileWidth,
        y: game.config.tileHeight
      }, 0.5);
      origin = origin.sum(target.components.position);

      const damageNumber = new DamageNumber(origin, event, game.config);
      damageNumber.addToScene(game.scene);
    }, FORWARD_MOTION_TIME);

    await path.start();
    attacker.resetPosition();
    await wait(POST_ATTACK_DELAY_TIME);
  }
}

export default AttackMotion;