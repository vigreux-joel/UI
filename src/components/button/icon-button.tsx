import type { FunctionComponent } from "react";
import React from "react";
import { Icon } from "../icon/icon";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { StylingHelper } from "../utils/StylingHelper";

export enum IconButtonVariant {
  STANDARD = "standard",
  FILLED = "filled",
  TONAl = "tonal",
  OUTLINED = "outlined",
}

type BaseProps = {
  variant?: IconButtonVariant;
  disabled?: boolean;
  arialLabel: string;
  icon: IconDefinition;
};

interface ButtonProps extends BaseProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  href: never;
  title: never;
}

interface LinkProps extends BaseProps {
  href: string;
  title: string;
  onClick: never;
  type: never;
  iconUnselected: never;
  iconSelected: never;
  isActive: never;
  onToggle: never;
}

interface ButtonToggleableProps extends Omit<BaseProps, "icon"> {
  iconUnselected: IconDefinition;
  iconSelected: IconDefinition;
  isActive?: boolean;
  onToggle: (isActive: boolean) => void;
  type: never;
  href: never;
  title: never;
}

export type IconButtonProps = ButtonProps | LinkProps | ButtonToggleableProps;

export const IconButton: FunctionComponent<IconButtonProps> = (
  props,
  context
) => {
  const [isActive, setIsActive] = React.useState(
    "isActive" in props ? props.isActive : false
  );
  let handleClick:
    | ((event: React.MouseEvent<HTMLElement>) => void)
    | (() => void)
    | undefined;
  let icon: IconDefinition;

  if (!("onToggle" in props)) {
    if ("onClick" in props) {
      handleClick = props.onClick;
    }
    icon = props.icon;
  } else {
    handleClick = () => {
      setIsActive(!isActive);
      if (typeof isActive === "boolean" && isActive) {
        props.onToggle?.(isActive);
      }
    };
    icon = isActive ? props.iconSelected : props.iconUnselected;
  }

  const {
    variant = IconButtonVariant.STANDARD,
    href,
    disabled,
    type = "button",
    title,
    arialLabel,
  } = props;

  // Détermine le type de l'élément à rendre : un bouton ou un lien
  const ElementType = href ? "a" : "button";

  let linkProps: any = {};
  if (href) {
    linkProps.href = href;
    linkProps.title = title;
  }

  let buttonProps: any = {};
  if (!href) {
    buttonProps.type = type;
    buttonProps.onClick = handleClick;
  }

  const getButtonClass = StylingHelper.classNames([
    "rounded-full overflow-hidden transition-all duration-300",
    {
      applyWhen: variant == IconButtonVariant.FILLED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "bg-surface-container": !isActive,
              "bg-primary": isActive,
            },
          ],
        },
        {
          applyWhen: Boolean(disabled),
          styles: ["bg-on-surface/[0.12]"],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.TONAl,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "bg-surface-container": !isActive,
              "bg-secondary-container": isActive,
            },
          ],
        },
        {
          applyWhen: Boolean(disabled),
          styles: ["bg-on-surface/[0.12]"],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.OUTLINED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "border border-outline": !isActive,
              "border border-transparent bg-inverse-surface": isActive,
            },
          ],
        },
        {
          applyWhen: Boolean(disabled),
          styles: [
            {
              "border border-on-surface/[0.12]": !isActive,
              "border border-transparent bg-on-surface/[0.12]": isActive,
            },
          ],
        },
      ],
    },
  ]);
  const getStateClass = StylingHelper.classNames([
    "p-2 flex ",
    {
      applyWhen: variant == IconButtonVariant.STANDARD,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "state-on-surface-variant": !isActive,
              "state-primary": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.FILLED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "state-primary": !isActive,
              "state-inverse-on-surface": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.TONAl,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "state-on-surface-variant": !isActive,
              "state-on-secondary": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.OUTLINED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "state-on-surface-variant": !isActive,
              "state-on-primary": isActive,
            },
          ],
        },
      ],
    },
  ]);
  const getIconClass = StylingHelper.classNames([
    "h-5 transition-all duration-300",
    {
      applyWhen: variant == IconButtonVariant.STANDARD,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            { "text-on-surface-variant": !isActive, "text-primary": isActive },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.FILLED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "text-primary": !isActive,
              "text-on-primary": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.TONAl,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "text-on-surface-variant": !isActive,
              "text-on-secondary-container": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: variant == IconButtonVariant.OUTLINED,
      styles: [
        {
          applyWhen: !disabled,
          styles: [
            {
              "text-on-surface-variant": !isActive,
              "text-inverse-on-surface": isActive,
            },
          ],
        },
      ],
    },
    {
      applyWhen: Boolean(disabled),
      styles: ["text-on-surface/[0.38]"],
    },
  ]);
  return (
    <ElementType
      disabled={disabled}
      href={href}
      title={title}
      className={getButtonClass}
      aria-label={arialLabel}
      {...buttonProps}
      {...linkProps}
    >
      <span className={getStateClass}>
        {icon && <Icon icon={icon} className={getIconClass} />}
      </span>
    </ElementType>
  );
};
