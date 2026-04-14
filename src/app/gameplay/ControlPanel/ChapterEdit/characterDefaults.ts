import { Character } from "@/data/db";

export const createDefaultCharacter = (): Character => ({
  id: null,
  campaignId: null,
  name: "",
  className: "",
  level: 1,
  exp: 0,
  movement: 5,
  moveType: "infantry",
  stats: {
    mhp: 1, str: 0, mag: 0, skl: 0,
    spd: 0, luk: 0, def: 0, res: 0
  },
  growths: {
    mhp: 0, str: 0, mag: 0, skl: 0,
    spd: 0, luk: 0, def: 0, res: 0
  },
  skills: [],
  items: []
});
