import { useEffect } from "react";
import EventEmitter from "utils/EventEmitter";

type KeyAction =
  'close' |
  'toggle_character_detail_display'

const defaultKeybinds: { [K: string]: KeyAction } = {
  'escape': 'close',
  'c':      'toggle_character_detail_display'
}

// Maps keys to actions and vice versa
const keybinds = new Map(Object.entries(defaultKeybinds));

// Passes action events to components that have useKeybind hook
const keyEventEmitter = new EventEmitter();

// Attach main event listener to document
function handleKeyDown(event: KeyboardEvent): void {
  const key = event.key.toLowerCase();
  const action = keybinds.get(key);
  keyEventEmitter.emit(action);
}
document.addEventListener('keydown', handleKeyDown);

/**
 * Calls a function when a key that is bound to the desired action is pressed.
 * @param action String identifying the action
 * @param callback Callback function (imperative)
 */
function useKeybind(action: KeyAction, callback: () => void): void {
  useEffect(() => {
    keyEventEmitter.on(action, callback);
    
    return function cleanup() {
      keyEventEmitter.off(action, callback);
    }
  });
}

export default useKeybind;