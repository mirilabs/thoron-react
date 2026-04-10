import React from "react";
import ItemCreator from "../gameplay/ControlPanel/UnitEdit/ItemCreator";
import { Item } from "@/data/db";
import { ItemEntry } from "../gameplay/ControlPanel/UnitEdit/ItemsForm";
import db from "@/data/db";
import ItemCreateJSON from "./ItemCreateJSON";

function ItemList({ campaignId, items }: {
  campaignId: number,
  items: Item[]
}) {
  const itemEntries = items.map(item => (
    <ItemEntry key={item.id} item={item}
      onUpdate={() => handleItemUpdate(item)}
      onDelete={() => handleItemDelete(item)} />
  ));

  const handleItemCreate = async (item: Item) => {
    await db.items.add({
      ...item,
      campaignId,
    });
  }

  const handleItemsCreate = async (items: Item[]) => {
    const itemsToAdd = items.map(item => ({
      ...item,
      campaignId,
    }));
    await db.items.bulkAdd(itemsToAdd);
  }

  const handleItemUpdate = async (item: Item) => {
    await db.items.update(item.id, item);
  }

  const handleItemDelete = async (item: Item) => {
    await db.items.delete(item.id);
  }

  return (
    <div className={
      "flex flex-col gap-4"
    }>
      <div className={
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
      }>
        {itemEntries}
        {items.length === 0 && (
          <p className="text-gray-400">No items in this campaign yet.</p>
        )}
      </div>
      <div className="flex flex-row items-center gap-4 flex-wrap">
        <ItemCreator onSave={handleItemCreate} />
        <ItemCreateJSON onSave={handleItemsCreate} />
      </div>
    </div>
  );
}

export default ItemList;