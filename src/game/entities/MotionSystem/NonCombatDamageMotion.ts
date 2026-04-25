import Game from "@/game/Game";
import UnitBody from "../UnitBody";
import { NonCombatDamageEvent } from "thoron";
import wait from "@/game/utils/wait";
import Vector2 from "@/engine/utils/Vector2";
import DamageNumber from "../ui/DamageNumber";

const WAIT_TIME = 500; // ms

function NonCombatDamageMotion(
  game: Game,
  unit: UnitBody,
  event: NonCombatDamageEvent
) {
  return async function nonCombatDamageMotion() {
    let origin = Vector2.scale({
      x: game.config.tileWidth,
      y: game.config.tileHeight
    }, 0.5);
    origin = origin.sum(unit.entity.getComponent("position"));

    const damageNumber = new DamageNumber(origin, event.damage, game.config);
    damageNumber.addToScene(game.scene);

    await wait(WAIT_TIME);
  }
}

export default NonCombatDamageMotion;
