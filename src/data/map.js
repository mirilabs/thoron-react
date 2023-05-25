const data = {
  id: 1,
  tiles: {
    0: {
      name: 'plains',
      cost: 1
    },
    1: {
      name: 'forest',
      cost: {
        default: 2,
        cavalry: 3
      },
      bonus: {  }
    },
    2: {
      name: 'wall',
      cost: 99
    }
  },
  map: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0]
  ]
}

export default data;