
import {
  useContext,
  useEffect
} from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import { UIAction } from "@/shared/UIEventEmitter";

type KeybindSchema = { [K: string]: UIAction };

const defaultKeybinds: KeybindSchema = {
  'enter':  'confirm',
  'escape': 'cancel',
  'z':      'confirm',
  'x':      'cancel',
  'c':      'open_character_detail',
  'left':   'left', 'arrowleft': 'left',
  'right':  'right', 'arrowright': 'right',
  'up':     'up', 'arrowup': 'up',
  'down':   'down', 'arrowdown': 'down',
  'l':      'open_chapter_log',
  'o':      'open_settings'
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