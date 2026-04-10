import React, { useState } from "react";
import db from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Link, useParams } from "react-router";
import CharacterList from "../characters/CharacterList";
import CampaignEdit from "./CampaignEdit";
import { Button, IconButton } from "@mui/material";
import { Campaign } from "@/data/db";

function CampaignInfo({ campaign }: { campaign: Campaign }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (title: string) => {
    await db.campaigns.update(campaign.id, { title });
    setIsEditing(false);
  }

  return (
    <div className={
      "border border-[var(--text-color)] rounded-lg p-4 w-[80%] " +
      "bg-[var(--bg-color)]"
    }>
      {isEditing ? (
        <CampaignEdit
          campaign={campaign}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl font-semibold">{campaign.title}</h1>
          <IconButton
            onClick={() => setIsEditing(true)}
            size="small">
            <i className="fas fa-edit" />
          </IconButton>
        </div>
      )}
    </div>
  )
}

function CampaignDetail() {
  const { id } = useParams();
  const campaign = useLiveQuery(() => db.campaigns.get(Number(id)), [id]);

  const mapCount = useLiveQuery(
    () => db.maps.where({ campaignId: Number(id) }).count(),
    [id]
  );

  const itemCount = useLiveQuery(
    () => db.items.where({ campaignId: Number(id) }).count(),
    [id]
  );

  if (!campaign) return (
    <div className="h-full flex flex-col items-center">
      Campaign not found
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center gap-4">
      <CampaignInfo campaign={campaign} />
      <CharacterList campaignId={Number(id)} />
      <div className={
        "bg-[var(--bg-color)] border border-[var(--text-color)] " +
        "rounded-lg p-4 " +
        "flex flex-col"
      }>
        <h1 className="text-xl font-bold">Assets</h1>
        <div className="flex flex-row items-center justify-between gap-8">
          <Link to={`/campaigns/${id}/maps`}>
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
          <Link to={`/campaigns/${id}/items`}>
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
    </div>
  )
}

export default CampaignDetail;