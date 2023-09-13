import type {Meta, StoryObj} from "@storybook/react";

import Button, {ButtonVariant} from "@/components/button/Button";
import {faPlus} from "@fortawesome/pro-regular-svg-icons";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { options: ["small", "medium", "large"], control: "radio" },
    type: {
      options: ["button", "submit", "reset", undefined],
      control: "radio",
    },
    icon: { control: "object" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const FilledWithoutIcon: Story = {
  args: {
    label: "Label",
    variant: ButtonVariant.Filled,
  },
};
export const FilledWithIcon: Story = {
  args: {
    label: "Label",
    icon: faPlus,
    variant: ButtonVariant.Filled,
  },
};

export const Outlined: Story = {
  args: {
    label: "Label",
    variant: ButtonVariant.Outlined,
  },
};

export const Text: Story = {
  args: {
    label: "Label",
    variant: ButtonVariant.Text,
  },
};

export const Elevated: Story = {
  args: {
    label: "Label",
    variant: ButtonVariant.Elevated,
  },
};
export const Tonal: Story = {
  args: {
    label: "Label",
    variant: ButtonVariant.FilledTonal,
  },
};
