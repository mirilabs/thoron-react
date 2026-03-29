import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameplayRoot from "./app/gameplay/GameplayRoot";
import Navigation from "./Navigation";

export default function Router() {
  return (
    <BrowserRouter>
      <div className="content">
        <Routes>
          <Route path="/" element={<GameplayRoot />} />
        </Routes>
      </div>
      <Navigation />
    </BrowserRouter>
  )
}