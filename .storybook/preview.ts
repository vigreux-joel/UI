import type { Preview } from '@storybook/react';

import { withThemeByClassName } from '@storybook/addon-styling';

import '../src/index.css';
import {Args, PartialStoryFn, StoryContext} from "@storybook/csf";
import {Renderer} from "react-dom";

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
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
