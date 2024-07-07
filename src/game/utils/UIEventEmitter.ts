import EventEmitter, { IEventSignatures } from "../../utils/EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  select_unit: (unit: any) => void;
  select_action: (action: string) => void;
}

class UIEventEmitter extends EventEmitter<UIEventSignatures> {
  selectedUnit: any;

  constructor() {
    super();

    this.on('select_unit', (unit) => { this.selectedUnit = unit });
  }
}

export default UIEventEmitter;