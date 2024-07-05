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
      name: 'wall',
      cost: 99
    }
  ],
  map: [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0]
  ]
}

export default data;