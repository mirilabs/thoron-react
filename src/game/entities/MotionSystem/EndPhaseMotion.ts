import Game from "@/game/Game";
import PhaseChange from "../ui/PhaseChange";

function EndPhaseMotion(
  game: Game,
) {
  return new Promise<void>((resolve) => {
    const phaseChange = new PhaseChange();
    phaseChange.addToScene(game.scene);
    resolve();
  });
}

export default EndPhaseMotion;