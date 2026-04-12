import { defaultKeybinds, KeybindSchema } from "./keybinds";

const options = {
  theme: [
    "ourple",
    "soap"
  ]
} as const;
type Theme = typeof options.theme[number];

type Settings = {
  theme: Theme;
  keybinds: KeybindSchema;
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
  theme: "ourple",
  keybinds: defaultKeybinds
};

const settingsController = {
  get(key: keyof Settings) {
    let item = localStorage.getItem(`settings.${key}`);
    return JSON.parse(item) ?? defaults[key];
  },

  set<K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ): boolean {
    if (options[key as keyof Settings].includes(value)) {
      localStorage.setItem(`settings.${key}`, JSON.stringify(value));
      applySetting(key, value);
      return true;
    }
    else return false;
  }
}

export default settingsController;

export function initializeUserSettings() {
  applySetting("theme", defaults.theme);
}

export {
  options,
  Theme
}