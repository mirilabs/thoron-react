import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./Navigation";
import CampaignIndex from "./app/campaigns/CampaignIndex";
import CampaignDetail from "./app/campaigns/CampaignDetail";
import GameplayRoot from "./app/gameplay/GameplayRoot";
import CharacterShow from "./app/characters/CharacterShow";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="/" element={<CampaignIndex />} />
          <Route path="/campaigns/:id">
            <Route index element={<CampaignDetail />} />
            <Route path="characters/:characterId" element={<CharacterShow />} />
          </Route>
          <Route path="/gameplay" element={<GameplayRoot />} />
        </Routes>
      </div>
      <Navigation />
    </BrowserRouter>
  )
}