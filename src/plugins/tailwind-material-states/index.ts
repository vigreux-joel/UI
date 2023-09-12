import plugin from "tailwindcss/plugin";
import chroma from "chroma-js";
import {getInteractionColors} from "./getInteractionColors";


// from tailwindcss src/util/flattenColorPalette
const flattenColorPalette = (colors: any): any =>
    Object.assign(
        {},
        ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
            typeof values == "object"
                ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
                    [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
                }))
                : [{ [`${color}`]: values }]
        )
    );

export default function TailwindMaterialStates(colors: Record<string, string>) {

    const {
        surfacePrefix,
        interactiveSurfacePrefix,
        disabledStyles,
        transition,
    } = {
        surfacePrefix: "bg",
        interactiveSurfacePrefix: "interactive-bg",
        disabledStyles: {
            textOpacity: 0.38,
            backgroundOpacity: 0.12,
        },
        transition: {
            duration: 150,
        },
    };

    Object.keys(colors).forEach((colorName) => {
        const onColorName = `on-${colorName}`;
        const color = colors[colorName];
        const onColor = colors[onColorName];

        if (
            !colorName.startsWith("on-") &&
            chroma.valid(color) &&
            chroma.valid(onColor)
        ) {
            const interactionColors = getInteractionColors(
                color,
                onColor,
            );

            colors[`${colorName}-hover`] = interactionColors.hover;
            colors[`${colorName}-press`] = interactionColors.press;
            colors[`${colorName}-focus`] = interactionColors.focus;
            colors[`${colorName}-drag`] = interactionColors.drag;
        }
    });

    return {
        colors: colors,
        plugin:
            plugin(({ addComponents, theme }) => {
                const colors = flattenColorPalette(theme("colors") || {});

                const materialColors = Object.keys(colors).filter(
                    (colorName) =>
                        colors[`on-${colorName}`] &&
                        colors[`${colorName}-hover`] &&
                        colors[`${colorName}-focus`] &&
                        colors[`${colorName}-press`]
                );

                let newComponents: { [key: string]: { [key: string]: {} } } = {};

                materialColors.forEach((colorName) => {

                    newComponents[`.${surfacePrefix}-${colorName}`] = {
                        ...(surfacePrefix === "bg"
                            ? {}
                            : {
                                [`@apply bg-${colorName}`]: {},
                            }),
                        [`@apply text-on-${colorName}`]: {},
                    };

                    newComponents[`.${interactiveSurfacePrefix}-${colorName}`] = {
                        [`@apply bg-${colorName}`]: {},
                        [`@apply text-on-${colorName}`]: {},
                        [`@apply hover:bg-${colorName}-hover`]: {},
                        [`@apply active:bg-${colorName}-press`]: {},
                        [`@apply focus-visible:bg-${colorName}-focus`]: {},
                        ...(transition
                            ? {
                                [`@apply transition-colors`]: {},
                                [`@apply duration-${transition.duration}`]: {},
                            }
                            : {}),
                        ...(disabledStyles
                            ? {
                                [`@apply disabled:text-on-surface/[${disabledStyles.textOpacity}]`]:
                                    {},
                                [`@apply disabled:bg-on-surface/[${disabledStyles.backgroundOpacity}]`]:
                                    {},
                            }
                            : {}),
                    };
                });

                addComponents(newComponents);
            }, {}),

    };
};