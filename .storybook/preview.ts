import type { Preview, Renderer } from '@storybook/react';

import '../src/index.css';
import {Args, PartialStoryFn, StoryContext} from "@storybook/csf";
import { withThemeByClassName } from "@storybook/addon-themes";


const preview: {
  decorators: ((fn: PartialStoryFn<Renderer, Args>, c: StoryContext<Renderer, Args>) => Renderer["storyResult"])[];
  parameters: { controls: { matchers: { date: RegExp; color: RegExp } }; actions: { argTypesRegex: string } }
} = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

     decorators: [
    withThemeByClassName<Renderer>({
          themes: {
        light: "",
            dark: "dark",
         },
    defaultTheme: "light",
      }),
 ]
};

export default preview;
