import EventEmitter, { IEventSignatures } from "./EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  // gameplay
  select_tile: (tile: any) => void;
  select_unit: (unit: any) => void;
  set_equipped_index: (index: number) => void;

  // menu navigation
  confirm: () => void;
  cancel: () => void;
  left: () => void;
  right: () => void;
  up: () => void;
  down: () => void;
  
  // menu toggling
  open_action_menu: () => void;
  close_action_menu: () => void;
  select_action: (action: string) => void;
  toggle_character_detail_display: () => void;
}

type UIAction = keyof UIEventSignatures;

class UIEventEmitter extends EventEmitter<UIEventSignatures> {
  selectedUnit: any;

  constructor() {
    super();

    this.on('select_unit', (unit) => { this.selectedUnit = unit });
  }
}

export default UIEventEmitter;
export {
  UIEventSignatures,
  UIAction
}