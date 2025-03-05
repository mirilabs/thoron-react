import { fire, heal, ironBow, ironLance, ironSword } from './items';
import map from './map';
import unitFactory from './unitFactory';

const saveState = {
  units: [
    {
      record: {
        ...unitFactory(),
        items: [
          ironSword,
          ironLance,
          heal
        ],
        sprite: 'https://cdn.discordapp.com/emojis/1107849361691529227.webp'
      },
      position: { x: 1, y: 3 },
      actionState: { team: 0, canAct: true }
    },
    {
      record: {
        ...unitFactory(),
        items: [
          ironBow,
          ironSword
        ],
        sprite: 'https://cdn.discordapp.com/emojis/1112145799657304104'
      },
      position: { x: 4, y: 3 },
      actionState: { team: 1, canAct: false }
    },
    {
      record: {
        ...unitFactory(),
        items: [
          fire
        ],
        sprite: 'https://cdn.discordapp.com/emojis/1278905499680510045'
      },
      position: { x: 3, y: 4 },
      actionState: { team: 2, canAct: false }
    }
  ],
  map,
  turn: 0,
  phase: 0
}

export default saveState;