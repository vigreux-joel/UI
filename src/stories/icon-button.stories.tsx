import type {Meta, StoryObj} from "@storybook/react";

import {IconButton, IconButtonProps, IconButtonVariant,} from "@/components/button/icon-button";
import {faGear as farGear} from "@fortawesome/pro-regular-svg-icons";
import {faGear as fasGear} from "@fortawesome/pro-solid-svg-icons";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Inputs/IconButton",
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: { table: { disable: true } },
    icon: { table: { disable: true } },
    disabled: { table: { disable: true } },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const createIconButtonStory = (
  variant: IconButtonVariant,
  toggle?: boolean,
  args?: Partial<IconButtonProps>
) => {
  const IconButtonStory: Story = (
    args: { arialLabel: string } & Partial<IconButtonProps>
  ) => (
    <div className="">
      {!("onToggle" in args) && (
        <>
          <div className="flex m-4 gap-4 items-center">
            <IconButton icon={faGear} {...args} />
            <IconButton icon={faGear} {...args} disabled />
          </div>
        </>
      )}
      {"onToggle" in args && (
        <>
          <div className="flex m-4 gap-4 items-center">
            <IconButton
              {...args}
              onToggle={(isActive) => {}}
              iconSelected={fasGear}
              iconUnselected={farGear}
            />
            <IconButton
              {...args}
              disabled
              onToggle={(isActive) => {}}
              iconSelected={fasGear}
              iconUnselected={farGear}
            />
          </div>
          <div className="flex m-4 gap-4 items-center">
            <IconButton
              {...args}
              isActive
              onToggle={(isActive) => {}}
              iconSelected={fasGear}
              iconUnselected={farGear}
            />
            <IconButton
              {...args}
              disabled
              isActive
              onToggle={(isActive) => {}}
              iconSelected={fasGear}
              iconUnselected={farGear}
            />
          </div>
        </>
      )}
    </div>
  );
  IconButtonStory.args = {
    variant: variant,
    arialLabel: "Action description",
    ...args,
  };
  return IconButtonStory;
};
export const StandardToggleable = createIconButtonStory(
  IconButtonVariant.STANDARD
);
export const FilledToggleable = createIconButtonStory(IconButtonVariant.FILLED);

export const TonalToggleable = createIconButtonStory(IconButtonVariant.TONAl);

export const OutlinedToggleable = createIconButtonStory(
  IconButtonVariant.OUTLINED
);
