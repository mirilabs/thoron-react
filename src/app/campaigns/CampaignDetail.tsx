import React from "react";
import db from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import CharacterIndex from "../characters/CharacterIndex";

function CampaignDetail() {
  const { id } = useParams();
  const campaign = useLiveQuery(() => db.campaigns.get(Number(id)), [id]);

  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="h-full flex flex-col items-center">
      <div className="border border-gray-500 rounded-lg p-4 w-[80%]">
        <h1 className="text-xl font-semibold">{campaign.title}</h1>
      </div>
      <CharacterIndex campaignId={Number(id)} />
    </div>
  )
}

export default CampaignDetail;