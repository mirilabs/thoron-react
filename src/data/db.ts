import { Dexie, type EntityTable } from "dexie";
import { ItemRecord, IUnitRecord } from "thoron";

type Campaign = {
  id: number,
  title: string,
}

type Character = IUnitRecord & {
  id: number,
  campaignId: number,
  portrait: Blob,
  mapSprite: Blob
}

type Item = ItemRecord & {
  id: number,
  campaignId: number
}

const db = new Dexie("thoron") as Dexie & {
  campaigns: EntityTable<Campaign, "id">,
  characters: EntityTable<Character, "id">,
  items: EntityTable<Item, "id">,
}

db.version(1).stores({
  campaigns: "++id, title",
  characters: [
    "++id",
    "name",
    "className",
    "classTags",
    "level",
    "exp",
    "movement",
    "stats",
    "growths",
    "skills",
    "items",
    "campaignId",
    "portrait",
    "mapSprite"
  ].join(", "),
  items: [
    "++id",
    "name",
    "description",
    "maxUses",
    "type",
    "stats",
    "campaignId"
  ].join(", "),
});

export type { Campaign, Character, Item };

export default db;