import { Link, useLocation } from "react-router";
import "./Navigation.scss";
import React from "react";
import { Button, IconButton } from "@mui/material";
import SettingsRoot from "./app/settings/SettingsRoot";
import { useLiveQuery } from "dexie-react-hooks";
import db from "./data/db";

function CampaignHomeNav({ campaignId }: { campaignId: number }) {
  const campaign = useLiveQuery(() => db.campaigns.get(campaignId));
  if (!campaign) return null;

  const baseClassName = (
    "hover:bg-[var(--bg-color-2)] transition-colors duration-200 items-center "
  );
  return (
    <>
      <Link to={`/campaigns/${campaignId}`} className={
        baseClassName + "hidden sm:flex p-4"
      }>
        <h2 className="text-xl text-[var(--text-color-2)] max-w-[200px] truncate">
          {campaign.title}
        </h2>
      </Link>
      <Link to={`/campaigns/${campaignId}`} className={
        baseClassName + "flex sm:hidden p-2"
      }>
        <IconButton>
          <i className="fas fa-home" />
        </IconButton>
      </Link>
    </>
  )
}

function NavButton({ to, label, icon }: {
  to: string,
  label: string
  icon?: string
}) {
  const iconElement = icon ? <i className={`fas fa-${icon}`} /> : null;

  return (
    <>
      <Link to={to} className="hidden sm:flex">
        <Button variant="text"
          sx={{ flex: 1, flexDirection: "column", gap: 0.5, py: 1 }}>
          {iconElement}
          {label}
        </Button>
      </Link>
      <Link to={to} className="flex sm:hidden items-center p-2">
        <IconButton>
          {iconElement}
        </IconButton>
      </Link>
    </>
  )
}

function Navigation() {
  const location = useLocation();
  const path = location.pathname.split("/");
  const campaignId = path[1] === "campaigns" ? path[2] : null;

  return (
    <nav className="flex flex-row gap-1">
      <Link to={"/"} className={
        "ml-2 sm:ml-4 p-2 sm:p-4 flex items-center " +
        "hover:bg-[var(--bg-color-2)] transition-colors duration-200 "
      }>
        <h1 className="text-lg sm:text-2xl font-bold">thoron</h1>
      </Link>
      {campaignId &&
        <>
          <CampaignHomeNav campaignId={Number(campaignId)} />
          <NavButton to={`/campaigns/${campaignId}/characters`}
            label="Characters" icon="user" />
          <NavButton to={`/campaigns/${campaignId}/maps`}
            label="Maps" icon="map" />
          <NavButton to={`/campaigns/${campaignId}/items`}
            label="Items" icon="toolbox" />
        </>
      }
      <div className="flex-grow"></div>
      <SettingsRoot />
    </nav>
  )
}

export default Navigation;