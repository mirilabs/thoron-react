import { useEffect } from 'react';

function useEventListener(eventListener, event, callback) {
  useEffect(() => {
    if (eventListener == undefined) return;

    eventListener.on(event, callback);

    return function cleanup() {
      eventListener.off(event, callback);
    }
  });
}

export default useEventListener;