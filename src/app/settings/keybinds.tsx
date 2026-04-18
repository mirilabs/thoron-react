
import {
  useContext,
  useEffect
} from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import { UIAction } from "@/shared/UIEventEmitter";

type KeybindSchema = { [K: string]: UIAction };

const defaultKeybinds: KeybindSchema = {
  // Confirm / Cancel
  'enter': 'confirm',
  'escape': 'cancel',
  'z': 'confirm',
  'x': 'cancel',

  // WASD movement
  'w': 'up',
  'a': 'left',
  's': 'down',
  'd': 'right',

  // Arrow movement
  'left': 'left',
  'arrowleft': 'left',
  'right': 'right',
  'arrowright': 'right',
  'up': 'up',
  'arrowup': 'up',
  'down': 'down',
  'arrowdown': 'down',

  // Menus
  'l': 'open_chapter_log',
  'o': 'open_settings',
  'c': 'open_character_detail',
}

const keybinds = new Map(Object.entries(defaultKeybinds));

// Render this component within a <ThoronContext> to bind keyboard events
// to the ui event emitter
function KeybindInitializer() {
  const { uiEvents } = useContext(ThoronContext);

  const handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    const key = event.key.toLowerCase();
    if (event.shiftKey || event.ctrlKey || event.altKey) return;

    const action = keybinds.get(key);
    if (action) uiEvents.emit(action);
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