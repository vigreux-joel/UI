import type { Config, Theme } from 'tailwindcss'

type ColorLevels = {
  DEFAULT: string,
  0: string,
  10: string,
  20: string,
  30: string,
  40: string,
  50: string,
  60: string,
  70: string,
  80: string,
  90: string,
  95: string,
  99: string,
  100: string,
};

type ColorVariant = ColorLevels & { DEFAULT: string };
type ColorName = 'primary' | 'secondary' | 'tertiary' | 'error' | 'neutral' | 'neutral-variant';
function getColors(colors: Record<ColorName, ColorVariant>): Record<[key: number], any>{
  return  {
    ...colors,
    'on-primary': {
      light: '#FFFFFF',
      DEFAULT: '#FFFFFF',
      dark: colors.primary["20"],
    },
    'primary-container': {
      light: colors.primary["90"],
      DEFAULT: colors.primary["90"],
      dark: colors.primary["30"],
    },
    'on-primary-container': {
      light: colors.primary["10"],
      DEFAULT: colors.primary["10"],
      dark: colors.primary["90"],
    },
    'on-secondary': {
      light: '#FFFFFF',
      DEFAULT: '#FFFFFF',
      dark: colors.secondary["20"],
    },
    'secondary-container': {
      light: colors.secondary["90"],
      DEFAULT: colors.secondary["90"],
      dark: colors.secondary["30"],
    },
    'on-secondary-container': {
      light: colors.secondary["10"],
      DEFAULT: colors.secondary["10"],
      dark: colors.secondary["90"],
    },
    'on-tertiary': {
      light: '#FFFFFF',
      DEFAULT: '#FFFFFF',
      dark: colors.tertiary["20"],
    },
    'tertiary-container': {
      light: colors.tertiary["90"],
      DEFAULT: colors.tertiary["90"],
      dark: colors.tertiary["30"],
    },
    'on-tertiary-container': {
      light: colors.tertiary["10"],
      DEFAULT: colors.tertiary["10"],
      dark: colors.tertiary["90"],
    },
    'on-error': {
      light: '#FFFFFF',
      DEFAULT: '#FFFFFF',
      dark: colors.error["20"],
    },
    'error-container': {
      light: colors.error["90"],
      DEFAULT: colors.error["90"],
      dark: colors.error["30"],
    },
    'on-error-container': {
      light: colors.error["10"],
      DEFAULT: colors.error["10"],
      dark: colors.error["90"],
    },
    'background': {
      light: colors.neutral["99"],
      DEFAULT: colors.neutral["99"],
      dark: colors.neutral['10'],
    },
    'on-background': {
      light: colors.neutral['10'],
      DEFAULT: colors.neutral['10'],
      dark: colors.neutral['90'],
    },
    'surface': {
      light: colors.neutral["99"],
      DEFAULT: colors.neutral["99"],
      dark: colors.neutral["10"],
    },
    'on-surface': {
      light: colors.neutral["10"],
      DEFAULT: colors.neutral["10"],
      dark: colors.neutral["90"],
    },
    'outline': {
      light: colors["neutral-variant"]["50"],
      DEFAULT: colors["neutral-variant"]["50"],
      dark: colors["neutral-variant"]["60"],
    },
    'surface-variant': {
      light: colors["neutral-variant"]["90"],
      DEFAULT: colors["neutral-variant"]["90"],
      dark: colors["neutral-variant"]["30"],
    },
    'on-surface-variant': {
      light: colors["neutral-variant"]["30"],
      DEFAULT: colors["neutral-variant"]["30"],
      dark: colors["neutral-variant"]["80"],
    },
  };
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...getColors({
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
          DEFAULT: "#7D5260",
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
        error: {
          DEFAULT: "#B3261E",
          0: "#000000",
          10: "#410E0B",
          20: "#601410",
          30: "#8C1D18",
          40: "#B3261E",
          50: "#DC362E",
          60: "#E46962",
          70: "#EC928E",
          80: "#F2B8B5",
          90: "#F9DEDC",
          95: "#FCEEEE",
          99: "#FFFBF9",
          100: "#FFFFFF",
        },
        neutral: {
          DEFAULT: "#605D62",
          0: "#000000",
          10: "#1C1B1F",
          20: "#313033",
          30: "#484649",
          40: "#605D62",
          50: "#787579",
          60: "#939094",
          70: "#AEAAAE",
          80: "#C9C5CA",
          90: "#E6E1E5",
          95: "#F4EFF4",
          99: "#FFFBFE",
          100: "#FFFFFF",
        },
        "neutral-variant": {
          DEFAULT: "#605D66",
          0: "#000000",
          10: "#1D1A22",
          20: "#322F37",
          30: "#49454F",
          40: "#605D66",
          50: "#79747E",
          60: "#938F99",
          70: "#AEA9B4",
          80: "#CAC4D0",
          90: "#E7E0EC",
          95: "#F5EEFA",
          99: "#FFFBFE",
          100: "#FFFFFF",
        },
      })
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
