import React from "react";
import "./themes.scss";
import ThemeSelector from "./ThemeSelector";

function Settings() {

  return (
    <div className="settings">
      <h3>Theme</h3>
      <ThemeSelector />
    </div>
  );
}

export default Settings;