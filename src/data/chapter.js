import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });
chapter.addUnit({
  record: {
    ...unitFactory(),
    sprite: 'https://cdn.discordapp.com/emojis/1107849361691529227.webp'
  },
  position: { x: 0, y: 0 }
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
  position: { x: 2, y: 1 }
})

export default chapter