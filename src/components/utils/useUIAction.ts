import ThoronContext from "components/ThoronContext";
import { useContext, useEffect } from "react";
import { UIAction, UIEventSignatures } from "shared/UIEventEmitter";

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
  action: UIAction
): (...args: Parameters<UIEventSignatures[K]>) => void {
  const { uiEvents } = useContext(ThoronContext);

  if (!uiEvents) {
    return (..._args) => {
      throw new Error("uiEventEmitter does not exist");
    }
  }
  else {
    return (...args) => {
      uiEvents.emit(action, ...args);
    }
  }
}

export default useUIAction;
export {
  useUIEmitter
}