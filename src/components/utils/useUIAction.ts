import ThoronContext from "components/ThoronContext";
import { useContext, useEffect } from "react";
import { UIAction, UIEventSignatures } from "utils/UIEventEmitter";

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
function useUIAction<K extends UIAction>(
  action: UIAction,
  callback: UIEventSignatures[K]
): void {
  const { uiEvents } = useContext(ThoronContext);

  useEffect(() => {
    if (!uiEvents) return;

    uiEvents.on(action, callback);

    return function cleanup() {
      uiEvents.off(action, callback);
    }
  });
}

function useUIEmitter<K extends UIAction>(
  action: UIAction,
  ...args: Parameters<UIEventSignatures[K]>
): () => void {
  const { uiEvents } = useContext(ThoronContext);

  if (!uiEvents) {
    return () => {
      throw new Error("uiEventEmitter does not exist");
    }
  }
  else {
    return () => {
      uiEvents.emit(action, ...args);
    }
  }
}

export default useUIAction;
export {
  useUIEmitter,
  KeybindHandler
}