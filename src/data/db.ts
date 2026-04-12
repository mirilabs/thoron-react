import { Dexie, type EntityTable } from "dexie";
import { ItemRecord, IUnitRecord, ITerrainRecord } from "thoron";

type Campaign = {
  id: number,
  title: string,
}

type Character = IUnitRecord & {
  id: number,
  campaignId: number,
  portrait?: Blob,
  mapSprite?: Blob
}

type Item = ItemRecord & {
  id: number,
  campaignId: number
}

type Map = ITerrainRecord & {
  id: number,
  campaignId: number,
  name: string,
  background?: Blob
}

type Chapter = {
  id: number,
  campaignId: number,
  name: string,
}

const db = new Dexie("thoron") as Dexie & {
  campaigns: EntityTable<Campaign, "id">,
  characters: EntityTable<Character, "id">,
  items: EntityTable<Item, "id">,
  maps: EntityTable<Map, "id">,
  chapters: EntityTable<Chapter, "id">
}

db.version(1).stores({
  campaigns: "++id, title",
  characters: [
    "++id",
    "name",
    "campaignId"
  ].join(", "),
  items: [
    "++id",
    "name",
    "campaignId"
  ].join(", "),
  maps: [
    "++id",
    "name",
    "campaignId"
  ].join(", "),
  chapters: [
    "++id",
    "name",
    "campaignId"
  ].join(", "),
});

export type { Campaign, Character, Item, Map, Chapter };

export default db;