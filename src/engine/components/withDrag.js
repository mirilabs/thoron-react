function withDrag({ start, move, stop }) {
  Object.assign(this, {
    dragStart: start,
    dragMove: move,
    dragStop: stop,

    
  })

  return this;
}

export default withDrag;