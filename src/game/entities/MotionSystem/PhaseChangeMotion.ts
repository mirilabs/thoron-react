import Game from "@/game/Game";
import PhaseChange from "../ui/PhaseChange";
import { ChapterEvent } from "thoron";
import UnitBody from "../UnitBody";

function PhaseChangeMotion(
  game: Game,
  event: ChapterEvent
) {
  if (event.type !== "phase_change") {
    throw new Error("Invalid event type for PhaseChangeMotion");
  }
  // get turn and phase count from the event
  const { turn, phase } = event.next;

  // remove ended-action effect from all unit bodies
  for (const unit of game.unitBodies.values()) {
    const unitBody = unit as UnitBody;
    unitBody.grayscale = false;
  }

  return new Promise<void>((resolve) => {
    // create phase change animation and add it to the scene
    const phaseChange = new PhaseChange(turn, phase);
    phaseChange.addToScene(game.scene);
    resolve();
  });
}

export default PhaseChangeMotion;