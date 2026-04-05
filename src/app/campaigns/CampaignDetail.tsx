import React, { useState } from "react";
import db from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import CharacterList from "../characters/CharacterList";
import CampaignEdit from "./CampaignEdit";
import { IconButton } from "@mui/material";
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

  if (!campaign) return (
    <div className="h-full flex flex-col items-center">
      Campaign not found
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center">
      <CampaignInfo campaign={campaign} />
      <CharacterList campaignId={Number(id)} />
    </div>
  )
}

export default CampaignDetail;