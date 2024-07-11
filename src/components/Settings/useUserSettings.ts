import "./themes.scss";

const options = {
  themes: [
    "ourple",
    "soap"
  ]
} as const;
type Theme = typeof options.themes[number];

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

// apply initial settings
applySetting("theme", defaults.theme);

const settingsController = {
  get(key: keyof Settings) {
    return localStorage.getItem(`settings.${key}`) ?? defaults[key];
  },

  set<K extends keyof Settings>(
    key: keyof Settings,
    value: Settings[K]
  ): boolean {
    if (options[key].includes(value)) {
      localStorage.setItem(`settings.${key}`, value);
      applySetting(key, value);
      return true;
    }
    else return false;
  }
}

function useUserSettings() {
  return settingsController;
}

export default useUserSettings;