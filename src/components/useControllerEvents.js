import { useContext, useEffect } from 'react';
import { ThoronContext } from './ThoronContext';

function useControllerEventListener(event, callback) {
  const { controllerEvents } = useContext(ThoronContext);

  useEffect(() => {
    if (controllerEvents == undefined) return;

    controllerEvents.on(event, callback);

    return function cleanup() {
      controllerEvents.off(event, callback);
    }
  });
}

export default useControllerEventListener;