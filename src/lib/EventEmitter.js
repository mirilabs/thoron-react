class EventEmitter {
  listeners = {}
  
  on(event, callback) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event, callback) {
    let callbacks = this.listeners[event];
    let index = callbacks.indexOf(callback);

    if (index < 0) return;
    callbacks.splice(index, 1);

    if (callbacks.length <= 0) {
      delete this.listeners[event];
    }
  }

  emit(event, ...params) {
    this.listeners[event]?.forEach(callback => callback(...params));
  }
}

export default EventEmitter;