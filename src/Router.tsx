import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import GameplayRoot from "./app/GameplayRoot";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameplayRoot />} />
      </Routes>
    </BrowserRouter>
  )
}