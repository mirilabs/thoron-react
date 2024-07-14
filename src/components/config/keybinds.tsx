
import {
  useContext,
  useEffect
} from "react";
import ThoronContext from "components/ThoronContext";
import { UIAction } from "utils/UIEventEmitter";

type KeybindSchema = { [K: string]: UIAction };

const defaultKeybinds: KeybindSchema = {
  'escape': 'cancel',
  'z':      'confirm',
  'x':      'cancel',
  'c':      'toggle_character_detail_display',
  'left':   'left',
  'right':  'right',
  'up':     'up',
  'down':   'down'
}

const keybinds = new Map(Object.entries(defaultKeybinds));

// Render this component within a <ThoronContext> to bind keyboard events
// to the ui event emitter
function KeybindInitializer() {
  const { uiEvents } = useContext(ThoronContext);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (event.shiftKey || event.ctrlKey || event.altKey) return;

    const action = keybinds.get(key);
    uiEvents.emit(action);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  });

  return null;
}

export {
  KeybindInitializer,
  KeybindSchema,
  defaultKeybinds
}