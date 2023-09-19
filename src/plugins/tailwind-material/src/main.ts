import { Config, PluginCreator } from "tailwindcss/types/config";
import { materialTheme } from "./material-theme";
import { darkTheme } from "./dark-theme";
import { materialStates } from "./material-states";
import { materialFonts } from "./material-fonts";

export const createMaterialTheme = (
  colorsMap: { primary: any; secondary: string; tertiary: string },
  darkMode: null | "class" | "media"
) => {
  let colors: Record<string, string> = materialTheme(colorsMap);
  const plugins: {
    handler: PluginCreator;
    config?: Partial<Config> | undefined;
  }[] = [];

  const states = materialStates(colors);
  plugins.push(states.plugin);

  if (darkMode) {
    const theme = darkTheme(colors, darkMode);
    colors = theme.colors;
    plugins.push(theme.plugin);
  }

  const fonts = materialFonts();
  plugins.push(fonts.plugin);

  return { colors: colors, fontFamily: fonts.fontFamily, plugins: plugins };
};
