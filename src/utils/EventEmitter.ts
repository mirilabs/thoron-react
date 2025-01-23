interface IEventSignatures {
  [K: symbol]: (...args: any[]) => void;
}

// Extract the callback type associated with key K in Signatures
type ExtractFunctionType<
  K extends keyof Signatures,
  Signatures extends IEventSignatures
> = 
  Signatures[K] extends (...args: infer P) => any ? Signatures[K] : never;

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

  once<K extends keyof Signatures>(
    event: K,
    callback: ExtractFunctionType<K, Signatures>
  ) {
    type F = typeof callback;
    const cb = (...args: Parameters<F>) => {
      callback(...args);
      this.off(event, cb as F);
    }
    this.on(event, cb as F);

    return cb;
  }

  emit<K extends keyof Signatures>(
    event: K,
    ...params: Parameters<ExtractFunctionType<K, Signatures>>
  ) {
    let listeners: Array<Signatures[K]> = this.listeners[event];
    
    if (listeners === undefined) return;

    listeners.forEach((callback: ExtractFunctionType<K, Signatures>) => {
      callback(...params);
    });
  }
}

export default EventEmitter;
export {
  IEventSignatures
}