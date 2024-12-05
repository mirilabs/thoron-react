import EventEmitter, { IEventSignatures } from "../utils/EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  // gameplay
  select_action: (action: string) => void;
  select_item: (item: any) => void;

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