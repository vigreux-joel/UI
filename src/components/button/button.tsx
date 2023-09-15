import type { FunctionComponent } from "react";
import { Icon } from "../icon/icon";
import { IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { ClassNameHelper } from "../utils/ClassNameHelper";

export enum ButtonVariant {
  Filled = "filled",
  Elevated = "elevated",
  Outlined = "outlined",
  Text = "text",
  FilledTonal = "tonal",
}

export interface ButtonProps {
  href?: string;
  disabled?: boolean;
  title?: string;
  label: string;
  icon?: IconDefinition;
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button: FunctionComponent<ButtonProps> = ({
  variant = ButtonVariant.Filled,
  disabled,
  icon,
  href,
  title,
  label,
  onClick,
  type,
}) => {
  // Détermine le type de l'élément à rendre : un bouton ou un lien
  const ElementType = href ? "a" : "button";

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

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

  const getButtonClass = ClassNameHelper.getFromVariant<ButtonVariant>(
    variant,
    "button group rounded-full",
    {
      [ButtonVariant.Elevated]: [
        "",
        {
          "bg-surface-container-low": !disabled,
        },
      ],
      [ButtonVariant.Filled]: [
        "",
        {
          "bg-primary": !disabled,
        },
      ],
      [ButtonVariant.FilledTonal]: [
        "",
        {
          "bg-secondary-container": !disabled,
        },
      ],
    }
  );

  const getStateLayerClass = ClassNameHelper.getFromVariant<ButtonVariant>(
    variant,
    "state-layer flex gap-2 justify-center rounded-full  items-center px-6 py-2.5",
    {
      elevated: [
        " ",
        {
          "group-disabled:bg-on-surface/[0.12]": disabled,
          "state-primary shadow-1  group-hover:shadow-2": !disabled,
        },
      ],
      [ButtonVariant.Filled]: [
        "",
        {
          "group-disabled:bg-on-surface/[0.12]": disabled,
          "state-on-primary group-hover:shadow-1": !disabled,
        },
      ],
      [ButtonVariant.FilledTonal]: [
        "",
        {
          "group-disabled:bg-on-surface/[0.12]": disabled,
          "state-on-secondary-container group-hover:shadow-1": !disabled,
        },
      ],
      [ButtonVariant.Outlined]: [
        " border",
        {
          "group-disabled:border-on-surface/[0.12]": disabled,
          "state-primary border-outline state-primary group-focus:border-primary":
            !disabled,
        },
      ],
      [ButtonVariant.Text]: [
        "",
        {
          "state-primary": !disabled,
        },
      ],
    }
  );

  const getIconClass = ClassNameHelper.getFromVariant<ButtonVariant>(
    variant,
    "icon h-[18px] w-[18px]",
    {
      [ButtonVariant.Elevated]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[38%]": disabled,
        },
      ],
      [ButtonVariant.Filled]: [
        "",
        {
          "text-on-primary": !disabled,
          "group-disabled:text-on-surface/[38%]": disabled,
        },
      ],
      [ButtonVariant.FilledTonal]: [
        "",
        {
          "text-on-secondary-container": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
      [ButtonVariant.Outlined]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
      [ButtonVariant.Text]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
    }
  );
  const getLabelTextClass = ClassNameHelper.getFromVariant<ButtonVariant>(
    variant,
    "label-text",
    {
      [ButtonVariant.Elevated]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[38%]": disabled,
        },
      ],
      [ButtonVariant.Filled]: [
        "",
        {
          "text-on-primary": !disabled,
          "group-disabled:text-on-surface/[38%]": disabled,
        },
      ],
      [ButtonVariant.FilledTonal]: [
        "",
        {
          "text-on-secondary-container": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
      [ButtonVariant.Outlined]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
      [ButtonVariant.Text]: [
        "",
        {
          "text-primary": !disabled,
          "group-disabled:text-on-surface/[0.38]": disabled,
        },
      ],
    }
  );

  return (
    <ElementType
      disabled={disabled}
      href={href}
      title={title}
      className={getButtonClass}
      {...buttonProps}
      {...linkProps}
    >
      <span className={getStateLayerClass}>
        {icon && <Icon icon={icon} className={getIconClass} />}
        <span className={getLabelTextClass}>{label}</span>
      </span>
    </ElementType>
  );
};
