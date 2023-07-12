class Animator {
  constructor(renderer) {
    this.renderer = renderer;
    this.queue = [];
    this.currentAnimation = null;
  }

  addToQueue(animation) {
    this.queue.push(animation);
  }

  step(timestamp) {
    this.lastTimestamp = timestamp;
  }
}

export default Animator;