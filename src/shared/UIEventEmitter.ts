import EventEmitter, { IEventSignatures } from "../utils/EventEmitter";

enum ControllerState {
  "idle",
  "action_select",
  "combat_forecast"
}

interface UIEventSignatures extends IEventSignatures {
  // gameplay
  select_action: (action: string) => void;
  reset_controller_state: (state: ControllerState) => void;

  // navigation
  confirm: () => void;
  cancel: () => void;
  left: () => void;
  right: () => void;
  up: () => void;
  down: () => void;
  
  // menu toggles
  open_character_detail: () => void;
}

type UIAction = keyof UIEventSignatures;

class UIEventEmitter extends EventEmitter<UIEventSignatures> {}

export default UIEventEmitter;
export {
  UIEventSignatures,
  UIAction
}