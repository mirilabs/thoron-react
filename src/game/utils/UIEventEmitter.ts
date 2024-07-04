import EventEmitter, { IEventSignatures } from "../../lib/EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  select_unit: (unit: any) => void;
}

class UIEventEmitter extends EventEmitter<UIEventSignatures> {
  selectedUnit: any;

  constructor() {
    super();

    this.on('select_unit', (unit) => { this.selectedUnit = unit });
  }
}

export default UIEventEmitter;