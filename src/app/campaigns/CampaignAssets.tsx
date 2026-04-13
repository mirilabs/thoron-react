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
      "flex flex-col gap-1"
    }>
      <h1 className="text-xl font-bold">Assets</h1>
      <Link to={`/campaigns/${campaignId}/maps`}>
        <Button variant="text"
          startIcon={<i className="fas fa-map" />}
          className="flex flex-row items-center gap-4 w-full">
          <p className="text-lg font-semibold">
            Maps
          </p>
          <p className="text-lg font-semibold text-[var(--text-color)] ml-auto">
            {mapCount}
          </p>
        </Button>
      </Link>
      <Link to={`/campaigns/${campaignId}/items`}>
        <Button variant="text"
          startIcon={<i className="fas fa-toolbox" />}
          className="flex flex-row items-center gap-4 w-full">
          <p className="text-lg font-semibold">
            Items
          </p>
          <p className="text-lg font-semibold text-[var(--text-color)] ml-auto">
            {itemCount}
          </p>
        </Button>
      </Link>
    </div>
  )
}

export default CampaignAssets;