class Node {
  components = new Map();
  children = [];

  constructor(props) {
    Object.assign(this, props);
  }

  handleEvent(eventName, ...args) {
    if (this[eventName]) this[eventName](...args);
    this.children.forEach(child => {
      if (child.isActive)
        child.handleEvent(eventName, ...args)
    });
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    let index = this.children.indexOf(child);
    if (index < 0) return;

    this.children.splice(index, 1);
  }
}

export default Node;