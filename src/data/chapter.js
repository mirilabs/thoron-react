import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });
chapter.addUnit({
  record: {
    ...unitFactory(),
    sprite: 'https://cdn.discordapp.com/emojis/1107849361691529227.webp'
  },
  position: { x: 1, y: 3 }
});
chapter.addUnit({
  record: {
    ...unitFactory(),
    items: [
      {
        name: 'Iron Bow',
        weapon: {
          minRange: 2,
          maxRange: 2
        }
      }
    ],
    sprite: 'https://cdn.discordapp.com/emojis/1112145799657304104'
  },
  position: { x: 4, y: 3 }
})

export default chapter