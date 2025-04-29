import Game from "@/game/Game";
import PhaseChange from "../ui/PhaseChange";
import { ChapterEvent } from "thoron";

function PhaseChangeMotion(
  game: Game,
  event: ChapterEvent
) {
  if (event.type !== "phase_change") {
    throw new Error("Invalid event type for PhaseChangeMotion");
  }
  const { turn, phase } = event.next;

  return new Promise<void>((resolve) => {
    const phaseChange = new PhaseChange(turn, phase);
    phaseChange.addToScene(game.scene);
    resolve();
  });
}

export default PhaseChangeMotion;