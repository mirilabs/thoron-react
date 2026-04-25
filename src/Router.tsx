import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./app/navigation";
import CampaignIndex from "./app/campaigns/CampaignIndex";
import CampaignDetail from "./app/campaigns/CampaignDetail";
import CharactersIndex from "./app/characters/CharactersIndex";
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
            <Route path="/campaigns">
              <Route index element={<CampaignIndex />} />
              <Route path=":campaignId">
                <Route index element={<CampaignDetail />} />
                <Route path="characters" element={<CharactersIndex />} />
                <Route path="characters/:characterId"
                  element={<CharactersIndex />} />
                <Route path="items" element={<ItemIndex />} />
                <Route path="maps" element={<MapsIndex />} />
                <Route path="maps/:mapId" element={<MapsIndex />} />
                <Route path="chapters/:chapterId" element={<ChapterShow />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </ErrorBoundary>
      <Navigation />
    </BrowserRouter>
  )
}