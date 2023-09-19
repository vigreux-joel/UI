import React, { FunctionComponent, useEffect } from "react";

import { TabsVariant } from "@/components/tabs/tabs";
import { Icon } from "@/components/icon/icon";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { StylingHelper } from "@/components/utils/StylingHelper";

export interface TabProps {
  selected?: boolean;
  label: string;
  variant?: TabsVariant;
  href?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: IconDefinition;
}

export const Tab: FunctionComponent<TabProps> = ({
  onClick,
  selected,
  label,
  variant = TabsVariant.Primary,
  href,
  title,
  type,
  icon,
}) => {
  const ElementType = href ? "a" : "button";

  const contentRef = React.useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const spanWidth = contentRef.current.offsetWidth;
      console.log(contentRef, spanWidth);
    }
  }, []);

  let linkProps: any = {};
  if (href) {
    linkProps.href = href;
    linkProps.title = title;
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  let buttonProps: any = {};
  if (!href) {
    buttonProps.type = type;
    buttonProps.onClick = handleClick;
  }

  const getTabClass = StylingHelper.classNames([
    "bg-surface",
    {
      applyWhen: Boolean(icon && label) && variant == TabsVariant.Primary,
      styles: ["h-16"],
    },
    {
      applyWhen: !(Boolean(icon && label) && variant == TabsVariant.Primary),
      styles: ["h-12"],
    },
  ]);

  const getStateLayerClass = StylingHelper.classNames([
    "px-4 h-full flex  gap-0.5 justify-end",
    {
      "pb-3.5": Boolean(label && !icon),
    },
    {
      applyWhen: variant == TabsVariant.Primary,
      styles: [
        "flex-col items-center",
        {
          "pb-2": Boolean(label && icon),
          "pb-3": Boolean(!label && icon),
          "state-on-surface": !selected,
          "state-primary": selected,
        },
      ],
    },
    {
      applyWhen: variant == TabsVariant.Secondary,
      styles: [
        "state-on-surface",
        {
          "flex-col items-center": Boolean(!(label && icon)),
          "flex-row pb-3 items-end gap-2": Boolean(label && icon),
        },
      ],
    },
  ]);
  const getIconClass = StylingHelper.classNames([
    "h-6 w-6 p-0.5 !box-border",
    {
      applyWhen: variant == TabsVariant.Primary,
      styles: [
        {
          "text-on-surface-variant": !selected,
          "text-primary": selected,
        },
      ],
    },
    {
      applyWhen: variant == TabsVariant.Secondary,
      styles: [
        {
          "text-on-surface-variant": !selected,
          "text-on-surface": selected,
        },
      ],
    },
  ]);
  const getLabelTextClass = StylingHelper.classNames([
    "title-small",
    {
      applyWhen: variant == TabsVariant.Primary,
      styles: [
        {
          "text-on-surface-variant": !selected,
          "text-primary": selected,
        },
      ],
    },
    {
      applyWhen: variant == TabsVariant.Secondary,
      styles: [
        {
          "text-on-surface-variant": !selected,
          "text-on-surface": selected,
        },
      ],
    },
  ]);
  return (
    <ElementType
      href={href}
      title={title}
      className={getTabClass}
      {...buttonProps}
      {...linkProps}
    >
      <span ref={contentRef} className={getStateLayerClass}>
        {icon && <Icon icon={icon} className={getIconClass} />}
        <span className={getLabelTextClass}>{label}</span>
      </span>
    </ElementType>
  );
};
