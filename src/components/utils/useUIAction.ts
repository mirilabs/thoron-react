import ThoronContext from "components/ThoronContext";
import useEventListener from "./useEventListener";
import { useContext, useEffect } from "react";
import { UIAction } from "utils/UIEventEmitter";

const defaultKeybinds: { [K: string]: UIAction } = {
  'escape': 'escape',
  'c':      'toggle_character_detail_display'
}

const keybinds = new Map(Object.entries(defaultKeybinds));

// Render this component within a <ThoronContext> to bind keyboard events
// to the ui event emitter
function KeybindHandler() {
  const { uiEvents } = useContext(ThoronContext);

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
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

/**
 * Calls a function when a key that is bound to the desired action is pressed.
 * @param action String identifying the action
 * @param callback Callback function (imperative)
 */
function useUIAction(action: UIAction, callback: () => void): void {
  const { uiEvents } = useContext(ThoronContext);

  useEventListener(uiEvents, action, callback);
}

export default useUIAction;
export {
  KeybindHandler
}