import { Campaign } from "@/data/db";
import { Link } from "react-router";
import React from "react";

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link to={`/campaigns/${campaign.id}`}>
      <div className="border border-gray-200 rounded-lg p-4 min-w-96 cursor-pointer">
        <h3 className="text-lg font-semibold">{campaign.title}</h3>
      </div>
    </Link>
  )
}

export default CampaignCard;