import {
    argbFromHex,
    hexFromArgb,
    Scheme,
    customColor,themeFromSourceColor
} from "@material/material-color-utilities";


/**
 *
 * @param {Record<string, string>} colorsMap Values must be hex colors and 'primary' must be present.
 */
export const getMaterialTheme = (colorsMap: { primary: any; secondary: string; tertiary: string; }) => {
    const { primary, secondary ,tertiary } = colorsMap;

    const source = argbFromHex(primary);

    const lightScheme = Scheme.light(source);
    const darkScheme = Scheme.dark(source);

    const colors: Record<string, string> = {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        white: "#ffffff",
    };

    Object.keys(lightScheme.toJSON()).forEach((colorName, index) => {
        if (!["shadow", "scrim"].includes(colorName)) {
            const kebabCase = colorName.replace(/([A-Z])/g, '-$1').toLowerCase();
            colors[`${kebabCase}-light`] = hexFromArgb(Object.values(lightScheme.toJSON())[index]);
            colors[`${kebabCase}-dark`] = hexFromArgb(Object.values(darkScheme.toJSON())[index]);

        }
    });

    return colors;
};