import EventEmitter, { IEventSignatures } from "../../../lib/EventEmitter";

interface UIEventSignatures extends IEventSignatures {
  select_unit: (unit: any) => void;
  pointer_mode: (mode: PointerMode) => void;
}

type PointerMode = 'idle' | 'dragging';

class UIEventEmitter extends EventEmitter<UIEventSignatures> {
  selectedUnit: any;
  pointerMode: PointerMode;

  constructor() {
    super();

    this.on('select_unit', (unit) => { this.selectedUnit = unit });
    this.on('pointer_mode', (mode) => { this.pointerMode = mode });
  }
}

export default UIEventEmitter;