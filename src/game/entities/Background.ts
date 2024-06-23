import Prototype from '../../engine/Prototype';

function Background(width, height, src = null) {
  return new Prototype({
    position: {
      x: 0,
      y: 0
    },
    rectangle: {
      width,
      height
    }
  })
}

export default Background;