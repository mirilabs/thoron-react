import ControllerState, { ControllerPhase } from "./ControllerState";
import IdleState from "./IdleState";

class AnimationState extends ControllerState {
  id = ControllerPhase.ANIMATION;

  onEnter(prevState: ControllerState): void {
    console.log("entered AnimationState");
    window.setTimeout(() => this.setState(new IdleState()), 1000);
  }

  onExit(nextState: ControllerState): void {
    console.log("exited AnimationState");
  }
}

export default AnimationState;