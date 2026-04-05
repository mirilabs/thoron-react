import React from "react";
import db, { Character } from "@/data/db";
import { ItemRecord } from "thoron";
import ItemCreator from "./ItemCreator";
import ItemCard from "../Items/ItemCard";

interface ItemsFormProps {
  data: Character;
  setData: (data: Character) => void;
}

function ItemEntry({ item }: { item: ItemRecord }) {
  return (
    <ItemCard item={item} />
  )
}

function ItemsForm({ data, setData }: ItemsFormProps) {
  const itemEntries = data.items.map((item, i) => (
    <ItemEntry key={i} item={item} />
  ));

  const handleSave = async (item: ItemRecord) => {
    const items = [...data.items, item];
    await db.characters.update(data.id, { items });
    setData({ ...data, items });
  }

  return (
    <div>
      {
        data.items.length === 0 &&
        <p className="mb-4 text-[var(--text-color-2)]">No items</p>
      }
      <div className="flex flex-col gap-2 mb-4">
        {itemEntries}
      </div>
      <ItemCreator onSave={handleSave} />
    </div>
  )
}

export default ItemsForm;
export type { ItemsFormProps };