import React from "react";
import db from "@/data/db";
import { useLiveQuery } from "dexie-react-hooks";
import CampaignCard from "./CampaignCard";
import NewCampaign from "./NewCampaign";

function CampaignIndex() {
  const campaigns = useLiveQuery(() => db.campaigns.toArray(), []);
  const campaignsCount = campaigns?.length || 0;

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      {campaigns?.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
      <div className="flex flex-col items-center gap-2">
        {campaignsCount === 0 &&
          <i className="fas fa-arrow-down text-2xl" />
        }
        <NewCampaign />
      </div>
    </div>
  )
}

export default CampaignIndex