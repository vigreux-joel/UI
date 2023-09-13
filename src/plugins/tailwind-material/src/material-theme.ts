import {
  argbFromHex,
  CorePalette,
  DynamicScheme,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  Scheme,
  TonalPalette,
} from "@material/material-color-utilities";

export interface CorePaletteColors {
  primary: number;
  secondary?: number;
  tertiary?: number;
  neutral?: number;
  neutralVariant?: number;
  error?: number;
}

export enum Variant {
  MONOCHROME,
  NEUTRAL,
  TONAL_SPOT,
  VIBRANT,
  EXPRESSIVE,
  FIDELITY,
  CONTENT,
  RAINBOW,
  FRUIT_SALAD,
}

export const materialTheme = (colorsMap: {
  primary: any;
  secondary?: string;
  tertiary?: string;
}) => {
  const primary = argbFromHex(colorsMap.primary);

  let secondary: number | undefined;
  if (colorsMap.secondary != null) {
    secondary = argbFromHex(colorsMap.secondary);
  }
  let tertiary: number | undefined;
  if (colorsMap.tertiary != null) {
    tertiary = argbFromHex(colorsMap.tertiary);
  }

  const colorPalette = CorePalette.fromColors({
    primary: primary,
    secondary: secondary,
    tertiary,
  });

  let lightScheme: Scheme = Scheme.lightFromCorePalette(colorPalette);
  const darkScheme = Scheme.darkFromCorePalette(colorPalette);

  const p = TonalPalette.fromHct(Hct.fromInt(primary));
  const s = TonalPalette.fromHct(Hct.fromInt(secondary ? secondary : primary));
  const t = TonalPalette.fromHct(Hct.fromInt(tertiary ? tertiary : primary));

  const colors: Record<string, string> = {
    transparent: "transparent",
    current: "currentColor",
    black: "#000000",
    white: "#ffffff",
  };

  ["light", "dark"].forEach((theme) => {
    const scheme = new DynamicScheme({
      sourceColorArgb: primary,
      variant: Variant.TONAL_SPOT,
      contrastLevel: 0,
      isDark: theme == "dark",
      primaryPalette: p,
      secondaryPalette: s,
      tertiaryPalette: t,
      neutralPalette: TonalPalette.fromHueAndChroma(p.hue, 6.0),
      neutralVariantPalette: TonalPalette.fromHueAndChroma(p.hue, 8.0),
    });

    for (let key in MaterialDynamicColors) {
      if (MaterialDynamicColors.hasOwnProperty(key)) {
        if (key !== "contentAccentToneDelta" && !key.includes("Palette")) {
          const argb = MaterialDynamicColors[key].getArgb(scheme);
          const hex = hexFromArgb(argb);
          const kebabCase = key.replace(/([A-Z])/g, "-$1").toLowerCase();

          colors[`${kebabCase}-${theme}`] = hex;
        }
      }
    }
  });

  return colors;
};
