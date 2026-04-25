import React from "react";
import CampaignIndex from "../campaigns/CampaignIndex";
import About from "./About";
import useResponsive from "../utils/useResponsive";

export default function HomePage() {
  const [size, sizes] = useResponsive();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={"flex gap-4 overflow-y-scroll " +
        (size === sizes.SMALL ? "flex-col" : "flex-row")
      }>
        <div className="p-2">
          <About />
        </div>
        <div className="p-2">
          <CampaignIndex />
        </div>
      </div>
    </div>
  )
}