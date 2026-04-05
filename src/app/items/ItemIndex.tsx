import React from "react";
import { Link, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import db, { Item } from "@/data/db";
import { Button } from "@mui/material";
import { ItemEntry } from "@/app/gameplay/ControlPanel/UnitEdit/ItemsForm";
import ItemCreator from "../gameplay/ControlPanel/UnitEdit/ItemCreator";

function ItemIndex() {
  const { id } = useParams();
  const campaignId = Number(id);

  const items = useLiveQuery(
    () => db.items.where({ campaignId }).toArray(),
    [campaignId]
  );

  if (!items) return null;

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

  const handleItemUpdate = async (item: Item) => {
    await db.items.update(item.id, item);
  }

  const handleItemDelete = async (item: Item) => {
    await db.items.delete(item.id);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to={`/campaigns/${campaignId}`}>
        <Button variant="text"
          startIcon={<i className="fas fa-arrow-left" />}>
          Back
        </Button>
      </Link>
      <div className={
        "flex flex-col gap-4 p-4 " +
        "bg-[var(--bg-color)] border border-[var(--text-color)] rounded-lg"
      }>
        <h1 className="text-xl font-bold">Campaign Items</h1>
        <div className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
        }>
          {itemEntries}
          {items.length === 0 && (
            <p className="text-gray-400">No items in this campaign yet.</p>
          )}
        </div>
        <div className="flex flex-row items-center">
          <ItemCreator onSave={handleItemCreate} />
        </div>
      </div>
    </div>
  );
}

export default ItemIndex;
