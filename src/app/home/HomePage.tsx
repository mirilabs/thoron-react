import React from "react";
import CampaignIndex from "../campaigns/CampaignIndex";
import About from "./About";
import useResponsive from "../utils/useResponsive";

export default function HomePage() {
  const [size, sizes] = useResponsive();

  return (
    <div className={
      "w-full md:h-full " +
      "flex gap-4 items-center " +
      "flex-col md:flex-row " +
      "pt-16 pb-32 md:py-0 " +
      "justify-center"
    }>
      <About />
      <CampaignIndex />
    </div>
  )
}