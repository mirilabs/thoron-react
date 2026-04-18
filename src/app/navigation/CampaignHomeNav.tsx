import React from "react";
import { Link } from "react-router";
import { IconButton } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/data/db";

export default function CampaignHomeNav({
  campaignId,
  variant = "standard"
}: {
  campaignId: number,
  variant?: "standard" | "icon-only"
}) {
  const campaign = useLiveQuery(() => db.campaigns.get(campaignId));
  if (!campaign) return null;

  const baseClassName = (
    "hover:bg-[var(--bg-color-2)] transition-colors duration-200 items-center "
  );
  return (variant === "icon-only") ? (
    <Link to={`/campaigns/${campaignId}`} className={
      baseClassName + "flex flex-1 p-2 justify-center"
    }>
      <IconButton>
        <i className="fas fa-home" />
      </IconButton>
    </Link>
  ) : (
    <Link to={`/campaigns/${campaignId}`} className={
      baseClassName + "flex p-4"
    }>
      <h2 className={
        "text-xl text-[var(--text-color-2)] max-w-[200px] truncate"
      }>
        {campaign.title}
      </h2>
    </Link>
  );
}