const data = {
  id: 1,
  tiles: [
    {
      name: 'plains',
      cost: 1
    },
    {
      name: 'forest',
      cost: {
        default: 2,
        cavalry: 3
      },
      bonus: {  }
    },
    {
      name: 'water',
      cost: {
        default: 99,
        flying: 1
      }
    },
    {
      name: 'wall',
      cost: 99
    }
  ],
  map: [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0],
    [0, 0, 1, 2, 1, 0],
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2]
  ]
}

export default data;