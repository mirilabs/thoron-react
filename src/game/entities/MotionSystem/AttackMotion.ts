import Game from "game/Game";
import UnitBody from "../UnitBody";
import { AttackEvent } from "thoron";
import MotionPath from "engine/utils/MotionPath";
import Vector2 from "engine/utils/Vector2";

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

  const path = new MotionPath(attacker.entity);
  path.addNode(dest, FORWARD_MOTION_TIME);
  path.addNode(startingPos, BACKWARD_MOTION_TIME);

  return async function attackMotion() {
    await path.start();
    attacker.resetPosition();
    await wait(POST_ATTACK_DELAY_TIME);
  }
}

export default AttackMotion;