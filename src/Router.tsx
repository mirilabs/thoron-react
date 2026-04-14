import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./Navigation";
import CampaignIndex from "./app/campaigns/CampaignIndex";
import CampaignDetail from "./app/campaigns/CampaignDetail";
import GameplayRoot from "./app/gameplay/GameplayRoot";
import CharacterShow from "./app/characters/CharacterShow";
import ItemIndex from "./app/items/ItemIndex";
import MapsIndex from "./app/maps/MapsIndex";
import ChapterShow from "./app/chapters/ChapterShow";
import ErrorBoundary from "./app/core/ErrorBoundary";

export default function Router() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="content">
          <Routes>
            <Route path="/" element={<CampaignIndex />} />
            <Route path="/campaigns/:id">
              <Route index element={<CampaignDetail />} />
              <Route path="characters/:characterId" element={<CharacterShow />} />
              <Route path="items" element={<ItemIndex />} />
              <Route path="maps" element={<MapsIndex />} />
              <Route path="maps/:mapId" element={<MapsIndex />} />
              <Route path="chapters/:id" element={<ChapterShow />} />
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
      <Navigation />
    </BrowserRouter>
  )
}