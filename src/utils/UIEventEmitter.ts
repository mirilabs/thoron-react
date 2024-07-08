import EventEmitter, { IEventSignatures } from "./EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  select_tile: (tile: any) => void;
  select_unit: (unit: any) => void;
  select_action: (action: string) => void;
  escape: () => void;
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
  UIAction
}