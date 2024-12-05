import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });

chapter.addUnit({
  record: {
    ...unitFactory(),
    items: [
      {
        name: 'Iron Sword',
        type: 'sword',
        maxUses: 40,
        weapon: {
          isMagic: false,
          might: 5,
          hit: 90,
          crit: 0,
          minRange: 1,
          maxRange: 1
        }
      },
      {
        name: 'Iron Lance',
        type: 'lance',
        maxUses: 40,
        weapon: {
          isMagic: false,
          might: 6,
          hit: 80,
          crit: 0,
          minRange: 1,
          maxRange: 1
        }
      },
    ],
    sprite: 'https://cdn.discordapp.com/emojis/1107849361691529227.webp'
  },
  position: { x: 1, y: 3 },
  actionState: { team: 0 }
});

chapter.addUnit({
  record: {
    ...unitFactory(),
    items: [
      {
        name: 'Iron Bow',
        type: 'bow',
        maxUses: 40,
        weapon: {
          isMagic: false,
          might: 6,
          hit: 80,
          crit: 0,
          minRange: 2,
          maxRange: 2
        }
      },
      {
        name: 'Iron Sword',
        type: 'sword',
        maxUses: 40,
        weapon: {
          isMagic: false,
          might: 5,
          hit: 90,
          crit: 0,
          minRange: 1,
          maxRange: 1
        }
      }
    ],
    sprite: 'https://cdn.discordapp.com/emojis/1112145799657304104'
  },
  position: { x: 4, y: 3 },
  actionState: { team: 1 }
})

chapter.addUnit({
  record: {
    ...unitFactory(),
    items: [
      {
        name: 'Fire',
        type: 'tome',
        maxUses: 40,
        weapon: {
          isMagic: true,
          might: 5,
          hit: 90,
          crit: 0,
          minRange: 1,
          maxRange: 2
        }
      }
    ],
    sprite: 'https://cdn.discordapp.com/emojis/1278905499680510045'
  },
  position: { x: 3, y: 4 },
  actionState: { team: 1 }
})

export default chapter