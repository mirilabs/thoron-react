import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./Navigation";
import CampaignIndex from "./app/campaigns/CampaignIndex";
import CampaignDetail from "./app/campaigns/CampaignDetail";
import GameplayRoot from "./app/gameplay/GameplayRoot";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="/" element={<CampaignIndex />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/gameplay" element={<GameplayRoot />} />
        </Routes>
      </div>
      <Navigation />
    </BrowserRouter>
  )
}