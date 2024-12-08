import ActionSelectState from "./ActionSelectState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import TargetSelectState from "./ActionConfirmState";

const controllerStates = {
  idle: IdleState,
  moving: MovingState,
  actionSelect: ActionSelectState,
  targetSelect: TargetSelectState
}

export default controllerStates;