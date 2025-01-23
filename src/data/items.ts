import { ItemRecord } from "thoron";

export const ironSword: ItemRecord = {
  name: "Iron Sword",
  type: "weapon",
  maxUses: 40,
  stats: {
    weaponType: 'sword',
    isMagic: false,
    might: 5,
    hit: 90,
    crit: 0,
    minRange: 1,
    maxRange: 1
  }
}

export const ironLance: ItemRecord = {
  name: 'Iron Lance',
  type: 'weapon',
  maxUses: 40,
  stats: {
    weaponType: 'lance',
    isMagic: false,
    might: 6,
    hit: 80,
    crit: 0,
    minRange: 1,
    maxRange: 1
  }
}

export const ironBow: ItemRecord = {
  name: 'Iron Bow',
  type: 'weapon',
  maxUses: 40,
  stats: {
    weaponType: 'bow',
    isMagic: false,
    might: 6,
    hit: 80,
    crit: 0,
    minRange: 2,
    maxRange: 2
  }
}

export const fire: ItemRecord = {
  name: 'Fire',
  type: 'weapon',
  maxUses: 40,
  stats: {
    weaponType: 'tome',
    isMagic: true,
    might: 5,
    hit: 90,
    crit: 0,
    minRange: 1,
    maxRange: 2
  }
}

export const heal: ItemRecord = {
  name: "Heal",
  type: "staff",
  maxUses: 30,
  stats: {
    effect: "heal",
    targetsAlly: true,
    basePower: 10,
    magicScale: 1/2,
    minRange: 1,
    maxRange: 1
  }
}