import React from "react";
import { Link, useLocation } from "react-router";
import { IconButton } from "@mui/material";
import SettingsRoot from "../settings/SettingsRoot";
import CampaignHomeNav from "./CampaignHomeNav";
import NavButton from "./NavButton";
import useResponsive from "../utils/useResponsive";
import NavTitle from "./NavTitle";

type NavBarProps = {
  campaignId: number | null
  isMobile: boolean
}

function NavBar({ campaignId, isMobile }: NavBarProps) {
  const buttonVariant = isMobile ? "icon-only" : "standard"

  return (
    <nav className="bg-[var(--bg-color)] flex flex-row gap-1">
      <NavTitle />
      {(campaignId !== null) &&
        <>
          <CampaignHomeNav campaignId={campaignId} variant={buttonVariant} />
          <NavButton to={`/campaigns/${campaignId}/characters`}
            label="Characters"
            icon="user"
            variant={buttonVariant} />
          <NavButton to={`/campaigns/${campaignId}/maps`}
            label="Maps"
            icon="map"
            variant={buttonVariant} />
          <NavButton to={`/campaigns/${campaignId}/items`}
            label="Items"
            icon="toolbox"
            variant={buttonVariant} />
        </>
      }
      {(!isMobile || campaignId === null) && <div className="flex-grow"></div>}
      <SettingsRoot />
    </nav>
  );
}

function Navigation() {
  const location = useLocation();
  const path = location.pathname.split("/");
  const campaignId = path[1] === "campaigns" ? Number(path[2]) : null;

  const [size, sizes] = useResponsive();

  return <NavBar campaignId={campaignId} isMobile={size <= sizes.SMALL} />
}

export default Navigation;