import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#6750A4",
        0: "#000000",
        10: "#21005D",
        20: "#381E72",
        30: "#4F378B",
        40: "#6750A4",
        50: "#7F67BE",
        60: "#9A82DB",
        70: "#B69DF8",
        80: "#D0BCFF",
        90: "#EADDFF",
        95: "#F6EDFF",
        99: "#FFFBFE",
        100: "#FFFFFF",
      },
      secondary: {
        DEFAULT: "#625B71",
        0: "#000000",
        10: "#1D192B",
        20: "#332D41",
        30: "#4A4458",
        40: "#625B71",
        50: "#7A7289",
        60: "#958DA5",
        70: "#B0A7C0",
        80: "#CCC2DC",
        90: "#E8DEF8",
        95: "#F6EDFF",
        99: "#FFFBFE",
        100: "#FFFFFF",
      },
      tertiary: {
        DEFAULT: "#000000",
        0: "#000000",
        10: "#31111D",
        20: "#492532",
        30: "#633B48",
        40: "#7D5260",
        50: "#986977",
        60: "#B58392",
        70: "#D29DAC",
        80: "#EFB8C8",
        90: "#FFD8E4",
        95: "#FFECF1",
        99: "#FFFBFA",
        100: "#FFFFFF",
      },
    },
    extend: {
      boxShadow: {
        '1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        '2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        '3': '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        '4': '0px 2px 3px 0px rgba(0, 0, 0, 0.30), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        '5': '0px 4px 4px 0px rgba(0, 0, 0, 0.30), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
