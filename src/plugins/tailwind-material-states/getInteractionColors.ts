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
