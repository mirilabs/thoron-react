import Game from "@/game/Game";
import PhaseChange from "../ui/PhaseChange";
import { ChapterEvent } from "thoron";

function PhaseChangeMotion(
  game: Game,
  event: ChapterEvent
) {
  console.log(event)

  return new Promise<void>((resolve) => {
    const phaseChange = new PhaseChange();
    phaseChange.addToScene(game.scene);
    resolve();
  });
}

export default PhaseChangeMotion;