import { IUnitRecord } from "thoron";

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

let i = 0;

function unitFactory(): IUnitRecord {
  return {
    id: i,
    name: `Unit ${i++}`,
    className: 'dummy',
    exp: 25,
    level: 1,
    stats: {
      mhp: randomInt(20) + 10,
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
    classTags: ['infantry'],
    items: [
      {
        name: 'Iron Sword',
        type: 'weapon',
        maxUses: 40,
        stats: {
          isMagic: false,
          might: 5,
          hit: 90,
          crit: 0,
          minRange: 1,
          maxRange: 1
        }
      }
    ],
    skills: []
  }
}

export default unitFactory;