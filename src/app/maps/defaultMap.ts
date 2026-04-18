import { ITerrainRecord } from "thoron";

const defaultMap: ITerrainRecord = {
  tiles: [
    {
      name: "Plains",
      cost: {
        default: 1,
        infantry: 1,
        cavalry: 1,
        armor: 1,
        flying: 1
      }
    },
    {
      name: "Forest",
      cost: {
        default: 1,
        infantry: 2,
        cavalry: 3,
        armor: 2,
        flying: 1
      },
      stats: {
        avd: 15
      }
    },
    {
      name: "Mountain",
      cost: {
        default: 1,
        infantry: 3,
        cavalry: 4,
        armor: 99,
        flying: 1
      },
      stats: {
        avd: 20,
        def: 1,
        res: 1
      }
    },
    {
      name: "Water",
      cost: {
        default: 99,
        infantry: 99,
        cavalry: 99,
        armor: 99,
        flying: 1
      },
      stats: {
        avd: 10
      }
    },
    {
      name: "Wall",
      cost: {
        default: 99,
        infantry: 99,
        cavalry: 99,
        armor: 99,
        flying: 99
      }
    },
    {
      name: "Fort",
      cost: {
        default: 1,
        infantry: 1,
        cavalry: 1,
        armor: 1,
        flying: 1
      },
      stats: {
        avd: 20,
        def: 2,
        res: 2,
      },
      heal: 20
    },
    {
      name: "Throne",
      cost: {
        default: 1,
        infantry: 1,
        cavalry: 1,
        armor: 1,
        flying: 1
      },
      stats: {
        avd: 30,
        def: 3,
        res: 3,
      },
      heal: 10
    }
  ],
  map: Array(6).fill(null).map(() => Array(8).fill(0))
}

export default defaultMap;