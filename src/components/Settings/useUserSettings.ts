import "./themes.scss";

const options = {
  theme: [
    "ourple",
    "soap"
  ]
} as const;
type Theme = typeof options.theme[number];

type Settings = {
  theme: Theme;
}

function applySetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  switch(key) {
    case "theme":
      document.documentElement.className = '';
      document.documentElement.classList.add(`theme-${value}`);
      break;
    default:
      throw new Error("Invalid settings key");
  }
}

const defaults: Readonly<Settings> = {
  theme: "ourple"
};

const settingsController = {
  get(key: keyof Settings) {
    return localStorage.getItem(`settings.${key}`) ?? defaults[key];
  },

  set<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ): boolean {
    if (options[key as keyof Settings].includes(value)) {
      localStorage.setItem(`settings.${key}`, value);
      applySetting(key, value);
      return true;
    }
    else return false;
  }
}
type SettingsController = typeof settingsController;

export default function useUserSettings(): SettingsController {
  return settingsController;
}

export function initializeUserSettings() {
  applySetting("theme", defaults.theme);
}

export {
  options,
  Theme,
  SettingsController
}