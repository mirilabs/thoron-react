import ActionSelectState from "./ActionSelectState";
import IdleState from "./IdleState";
import MovingState from "./MovingState";
import PanningState from "./PanningState";
import TargetSelectState from "./ActionConfirmState";

const controllerStates = {
  idle: IdleState,
  moving: MovingState,
  panning: PanningState,
  actionSelect: ActionSelectState,
  targetSelect: TargetSelectState
}

export default controllerStates;