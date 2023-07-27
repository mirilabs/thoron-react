function withPointerEvents() {
  this.withBehavior({
    onInit() {
      this.onGlobalMouseDown = this.onGlobalMouseDown.bind(this);
      this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
      this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);

      this.pointerEvents = this.getScene().pointerEvents;
      this.pointerEvents.on('mousedown', this.onGlobalMouseDown);
      this.pointerEvents.on('mousemove', this.onGlobalMouseMove);
      this.pointerEvents.on('mouseup', this.onGlobalMouseUp);
    },
    onDestroy() {
      this.pointerEvents.off('mousedown', this.onGlobalMouseDown);
      this.pointerEvents.off('mousemove', this.onGlobalMouseMove);
      this.pointerEvents.off('mouseup', this.onGlobalMouseUp);
    }
  });

  return this;
}

export default withPointerEvents;