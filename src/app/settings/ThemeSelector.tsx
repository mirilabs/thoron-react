import React from "react";
import settingsController, {
  options,
  Theme
} from "./userSettings";

function ThemeSwatch({ settings, theme }: {
  settings: typeof settingsController,
  theme: Theme
}) {
  return (
    <div className={`theme-selector theme-${theme}`}
      onClick={() => settings.set("theme", theme)}>
      {theme}
    </div>
  )
}

function ThemeSelector() {
  let settings = settingsController;

  let themeSelectors = options.theme.map(theme => (
    <ThemeSwatch settings={settings} theme={theme} key={theme} />
  ));

  return (
    <div className="settings__theme">
      <h3>Theme</h3>
      {themeSelectors}
    </div>
  );
}

export default ThemeSelector;