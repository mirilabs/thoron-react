type Callback = (...args: any[]) => void;

interface IEventSignatures {
  [K: string]: Callback;
}

class EventEmitter<Signatures extends IEventSignatures> {
  listeners: Partial<{
    [K in keyof Signatures]: Array<Signatures[K]>;
  }> = {};
  
  on<K extends keyof Signatures>(
    event: K,
    callback: Signatures[K]
  ) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off<K extends keyof Signatures>(
    event: K,
    callback: Signatures[K]
  ) {
    let callbacks = this.listeners[event];
    let index = callbacks.indexOf(callback);

    if (index < 0) return;
    callbacks.splice(index, 1);

    if (callbacks.length <= 0) {
      delete this.listeners[event];
    }
  }

  emit<K extends keyof Signatures>(
    event: K,
    ...params: Parameters<Signatures[K]>
  ) {
    this.listeners[event]?.forEach(callback => callback(...params));
  }
}

export default EventEmitter;
export {
  IEventSignatures
}