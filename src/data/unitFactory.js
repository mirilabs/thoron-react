function randomInt(max) {
  return Math.floor(Math.random() * max);
}

let i = 0;

const unitFactory = () => ({
  id: i,
  name: `Unit ${i++}`,
  class: 'dummy',
  exp: 0,
  level: 1,
  stats: {
    mhp: randomInt(20),
    str: randomInt(20),
    mag: randomInt(20),
    skl: randomInt(20),
    spd: randomInt(20),
    luk: randomInt(20),
    def: randomInt(20),
    res: randomInt(20)
  },
  growths: {
    mhp: randomInt(100),
    str: randomInt(100),
    mag: randomInt(100),
    skl: randomInt(100),
    spd: randomInt(100),
    luk: randomInt(100),
    def: randomInt(100),
    res: randomInt(100)
  },
  movement: 2,
  move_type: ['infantry'],
  weapon_profiency: {
    'sword': 0
  },
  items: [
    {
      name: 'Iron Sword',
      weapon: {
        minRange: 1,
        maxRange: 1
      }
    }
  ],
  skills: []
})

export default unitFactory;