type AsyncFunction = () => Promise<void>;

class AsyncQueue {
  queue: AsyncFunction[];
  isProcessing: boolean = false;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  add(asyncFn: AsyncFunction) {
    this.queue.push(asyncFn);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return;  // prevent multiple processing
    this.isProcessing = true;

    // Process each task in the queue sequentially
    while (this.queue.length > 0) {
      const cb = this.queue.shift();
      await cb();
    }

    this.isProcessing = false;
  }
}

export default AsyncQueue;