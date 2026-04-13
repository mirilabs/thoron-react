import React from "react"
import { Link } from "react-router"
import { Button } from "@mui/material"
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";

function CampaignAssets({ campaignId }: { campaignId: number }) {
  const id = Number(campaignId);

  const mapCount = useLiveQuery(
    () => db.maps.where({ campaignId: id }).count(),
    [id]
  );

  const itemCount = useLiveQuery(
    () => db.items.where({ campaignId: id }).count(),
    [id]
  );

  return (
    <div className={
      "bg-[var(--bg-color)] border border-[var(--text-color)] " +
      "rounded-lg p-4 " +
      "flex flex-col"
    }>
      <h1 className="text-xl font-bold">Assets</h1>
      <div className="flex flex-row items-center justify-between gap-8">
        <Link to={`/campaigns/${campaignId}/maps`}>
          <Button variant="text"
            startIcon={<i className="fas fa-map" />}>
            <p className="text-lg font-semibold">
              Maps
            </p>
          </Button>
        </Link>
        <p className="text-lg font-semibold">
          {mapCount}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-8">
        <Link to={`/campaigns/${campaignId}/items`}>
          <Button variant="text"
            startIcon={<i className="fas fa-toolbox" />}>
            <p className="text-lg font-semibold">
              Items
            </p>
          </Button>
        </Link>
        <p className="text-lg font-semibold">
          {itemCount}
        </p>
      </div>
    </div>
  )
}

export default CampaignAssets;