import plugin from "tailwindcss/plugin";
import chroma from "chroma-js";
import parse from 'color-parse';

function over (a, b) {
    if (!a.space) a = parse(a)
    if (!b.space) b = parse(b)

    if (a.space !== 'rgb') {
        throw new Error('First color\'s space ' + a.space + ' is not supported.')
    } else if (b.space !== 'rgb') {
        throw new Error('Second color\'s space ' + b.space + ' is not supported.')
    }

    if (a.alpha === 1) {
        return a
    } else if (a.alpha === 0) {
        return b
    }

    var o = {
        space: b.space,
        values: b.values.slice(),
        alpha: a.alpha + b.alpha * (1 - a.alpha)
    }

    // Color channels
    for (var i = 0; i < 3; i++) {
        var preA = a.values[i] * a.alpha
        var preB = b.values[i] * b.alpha
        o.values[i] = Math.round((preA + preB * (1 - a.alpha)) / o.alpha)
    }

    return o
}

const mix = (foregroundColor: string, backgroundColor: string, overlayOpacity: number) => {
    // TODO check if transparent makes sense
    const {
        values: [r, g, b],
    } = over(
        chroma(foregroundColor).alpha(overlayOpacity).hex(),
        backgroundColor
    );
    return `rgb(${r}, ${g}, ${b})`;
};

export function getInteractionColors(color: string, onColor:  string){
    return {
        hover: mix(onColor, color,  0.08),
        press: mix(onColor, color, 0.12),
        focus: mix(onColor, color,  0.12),
        drag: mix(onColor, color,  0.16),
    }
}


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

export function materialStates(colors: Record<string, string>) {

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