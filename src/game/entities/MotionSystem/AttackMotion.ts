import Game from "@/game/Game";
import UnitBody from "../UnitBody";
import { AttackEvent } from "thoron";
import MotionSequence from "@/engine/utils/MotionSequence";
import Vector2 from "@/engine/utils/Vector2";
import DamageNumber from "../ui/DamageNumber";
import wait from "@/game/utils/wait";

const MOTION_SCALE = 0.3; // 1.0 = one tile width
const FORWARD_MOTION_TIME = 120;  // ms
const BACKWARD_MOTION_TIME = 80;  // ms
const POST_ATTACK_DELAY_TIME = 500;  // ms

function createDamageNumber(game: Game, target: UnitBody, event: AttackEvent) {
  let origin = Vector2.scale({
    x: game.config.tileWidth,
    y: game.config.tileHeight
  }, 0.5);
  origin = origin.sum(target.entity.getComponent("position"));

  let value: string | number = "";
  if (event.didHit) {
    if (event.didCrit) value = `CRIT ${event.damage}`;
    else value = event.damage;
  }
  else {
    value = "MISS";
  }

  const damageNumber = new DamageNumber(origin, value, game.config);
  damageNumber.addToScene(game.scene);
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

  // attacker motion (moves toward target, then back to starting position)
  const path = new MotionSequence(attacker.entity);
  path.moveTo(dest, FORWARD_MOTION_TIME);
  path.moveTo(startingPos, BACKWARD_MOTION_TIME);

  return async function attackMotion() {
    // create damage number when forward motion is done
    window.setTimeout(() => {
      createDamageNumber(game, target, event);
    }, FORWARD_MOTION_TIME);

    // start motion
    await path.start();
    attacker.resetPosition();

    // wait a bit before system proceeds to next motion
    await wait(POST_ATTACK_DELAY_TIME);
  }
}

export default AttackMotion;