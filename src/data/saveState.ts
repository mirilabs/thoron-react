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
      state: { hp: 10, equippedIndex: 0 },
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
      position: { x: 2, y: 4 },
      state: { hp: 10, equippedIndex: 0 },
      actionState: { team: 0, canAct: true }
    },
    {
      record: {
        ...unitFactory(),
        items: [
          fire
        ],
        sprite: 'https://cdn.discordapp.com/emojis/1278905499680510045'
      },
      position: { x: 4, y: 3 },
      state: { hp: 10, equippedIndex: 0 },
      actionState: { team: 1, canAct: false }
    }
  ],
  map,
  turn: 0,
  phase: 0,
  history: []
}

export default saveState;