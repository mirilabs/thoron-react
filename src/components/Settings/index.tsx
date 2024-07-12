import React from "react";
import "./themes.scss";
import useUserSettings, {
  options,
  SettingsController,
  Theme
} from "./useUserSettings";

function ThemeSelector({ settings, theme }: {
  settings: SettingsController,
  theme: Theme
}) {
  return (
    <div className={`theme-selector theme-${theme}`}
      onClick={() => settings.set("theme", theme)}>
      {theme}
    </div>
  )
}

function Settings() {
  let settings = useUserSettings();

  let themeSelectors = options.theme.map(theme => (
    <ThemeSelector settings={settings} theme={theme} key={theme} />
  ));

  return (
    <div className="settings">
      <h3>Theme</h3>
      {themeSelectors}
    </div>
  );
}

export default Settings;