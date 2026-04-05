import React from "react";
import { Link, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import ItemCard from "@/app/gameplay/ControlPanel/Items/ItemCard";
import { Button } from "@mui/material";

function ItemIndex() {
  const { id } = useParams();
  const campaignId = Number(id);

  const items = useLiveQuery(
    () => db.items.where({ campaignId }).toArray(),
    [campaignId]
  );

  if (!items) return null;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link to={`/campaigns/${campaignId}`}>
        <Button variant="text"
          startIcon={<i className="fas fa-arrow-left" />}>
          Back
        </Button>
      </Link>
      <h1 className="text-xl font-bold">Campaign Items</h1>
      <div className={
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 "
      }>
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <p className="text-gray-400">No items in this campaign yet.</p>
        )}
      </div>
    </div>
  );
}

export default ItemIndex;
