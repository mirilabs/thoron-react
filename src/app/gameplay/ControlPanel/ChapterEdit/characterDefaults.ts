import { Character } from "@/data/db";

export const createDefaultCharacter = (campaignId: number): Character => ({
  id: 0, // Placeholder ID for new characters before DB insertion
  campaignId,
  name: "",
  className: "",
  level: 1,
  exp: 0,
  movement: 5,
  classTags: [],
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
