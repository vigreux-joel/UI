import React, { FunctionComponent, useState } from "react";
import { Tab, TabProps } from "./tab";
import { Diviser } from "@/components/diviser/diviser";
import { StylingHelper } from "@/components/utils/StylingHelper";

export enum TabsVariant {
  Primary = "primary",
  Secondary = "secondary",
}

export interface TabsProps {
  variant?: TabsVariant;
  tabs: Omit<TabProps, "selected">[];
}

export const Tabs: FunctionComponent<TabsProps> = ({
  tabs,
  variant = TabsVariant.Primary,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  const getTabClass = StylingHelper.classNames([
    "flex-1",
    {
      applyWhen: variant == TabsVariant.Primary,
      styles: [],
    },
    {
      applyWhen: variant == TabsVariant.Secondary,
      styles: [],
    },
  ]);

  const handleChange = (index: number) => (event) => {
    setSelectedTab(index);
  };

  return (
    <div className="">
      <div className="flex relative">
        {tabs.map((tab, index) => {
          const isSelected = index === selectedTab;
          return (
            <Tab
              variant={variant}
              onClick={handleChange(index)}
              className={getTabClass}
              selected={isSelected}
              setUnderlineWidth={(width) => {
                console.log(width);
                setUnderlineWidth(width);
              }}
              {...tab}
            ></Tab>
          );
        })}
        <span
          style={{ width: underlineWidth + "px" }}
          className={
            "bg-primary h-0.5 absolute  bottom-0 transition-all duration-300"
          }
        ></span>
      </div>
      <Diviser className="text-surface-container-highest " />
    </div>
  );
};
