import React from "react";
import db from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import CampaignCard from "./CampaignCard";
import NewCampaign from "./NewCampaign";

function CampaignIndex() {
  const campaigns = useLiveQuery(() => db.campaigns.toArray(), []);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      {campaigns?.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
      <NewCampaign />
    </div>
  )
}

export default CampaignIndex