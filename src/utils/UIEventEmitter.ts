import EventEmitter, { IEventSignatures } from "./EventEmitter";

interface UnitActions {
  [ActionType: symbol]: string | Object[];
}

interface UIEventSignatures extends IEventSignatures {
  // gameplay
  select_position: (pos: { x: number, y: number }) => void;
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
  open_action_menu: (actions: UnitActions) => void;
  close_action_menu: () => void;
  select_action: (action: string) => void;
  toggle_character_detail_display: () => void;
  open_attack_menu: () => void;
}

type UIAction = keyof UIEventSignatures;

class UIEventEmitter extends EventEmitter<UIEventSignatures> {
  selectedUnit: any;

  constructor() {
    super();

    this.on('select_unit', (unit) => {
      this.selectedUnit = unit
    });
    
    this.on("set_equipped_index", (index) => {
      // todo: check if unit can currently swap equipment
      this.selectedUnit.equip(index);
      this.emit("select_unit", this.selectedUnit);
    });
  }
}

export default UIEventEmitter;
export {
  UIEventSignatures,
  UIAction
}