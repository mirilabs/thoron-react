import React from "react";
import { Link, useParams } from "react-router";
import { Button } from "@mui/material";
import ItemList from "./ItemList";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";
import ItemListJSON from "./ItemListJSON";

function ItemIndex() {
  const [phase, setPhase] = React.useState<"list" | "export">("list");

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
      <div className={
        "flex flex-col gap-4 p-4 " +
        "bg-[var(--bg-color)] border border-[var(--text-color)] rounded-lg"
      }>
        <div className="flex flex-row">
          <h1 className="text-xl font-bold">Campaign Items</h1>
          <span className="ml-auto flex flex-row">
            {phase === "list" && (
              <Button variant="contained"
                onClick={() => setPhase("export")}
                startIcon={<i className="fas fa-arrow-up-from-bracket" />}>
                Export JSON
              </Button>
            )}
            {phase === "export" && (
              <Button variant="contained"
                onClick={() => setPhase("list")}
                startIcon={<i className="fas fa-arrow-left" />}>
                Back
              </Button>
            )}
          </span>
        </div>
        {phase === "list" && (
          <ItemList campaignId={campaignId} items={items} />
        )}
        {phase === "export" && (
          <ItemListJSON items={items} />
        )}
      </div>
    </div>
  );
}

export default ItemIndex;
