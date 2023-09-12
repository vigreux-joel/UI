import {getMaterialTheme} from "../tailwind_material_color/getMaterialTheme";
import {getDarkTheme} from "../tailwind_dark_mode/get-dark-theme";
import TailwindMaterialStates from "../tailwind-material-states";
import {Config, PluginCreator} from "tailwindcss/types/config";


export const createMaterialTailwind = (colorsMap: { primary: any; secondary: string; tertiary: string; }, darkmode: null | "class" | "media") => {
    if (colorsMap.primary) {
        let colors: Record<string, string> = getMaterialTheme(colorsMap);
        const plugins: {handler: PluginCreator, config?: Partial<Config> | undefined}[] = [];



        const materialStates = TailwindMaterialStates(colors)
        colors = materialStates.colors
        plugins.push(materialStates.plugin)

        if(darkmode){
            const darkTheme = getDarkTheme(colors, darkmode)
            colors = darkTheme.colors
            plugins.push(darkTheme.plugin)
        }



        return {colors: colors, plugins: plugins}
    } else {
        throw "A primary color must be specified";
    }
};
