import type { FunctionComponent } from "react";
import classNames from "classnames";
import Icon from "@/components/Icon";
import { faPlus, IconDefinition } from "@fortawesome/pro-regular-svg-icons";
import { ClassNameHelper } from "../utils/ClassNameHelper";

export enum ButtonVariant {
  Filled = "filled",
  Elevated = "elevated",
  Outlined = "outlined",
  Text = "text",
  FilledTonal = "tonal",
}

interface ButtonProps {
  href?: string;
  disabled?: boolean;
  title?: string;
  label: string;
  icon?: IconDefinition;
  className?: string;
  variant: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | undefined;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: FunctionComponent<ButtonProps> = ({
  variant = ButtonVariant.Filled,
  disabled,
  icon,
  href,
  title,
  label,
  className = "",
  onClick,
  size,
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
    "rounded-full",
    {
      [ButtonVariant.Elevated]: ["bg-surface-container-low"],
      [ButtonVariant.Filled]: ["bg-primary"],
    }
  );

  const getStateLayerClass = ClassNameHelper.getFromVariant<ButtonVariant>(
    variant,
    "state-layer flex gap-2 justify-center rounded-full  items-center px-6 py-2.5",
    {
      elevated: [
        "state-primary shadow-1 group-hover:shadow-2",
        {
          "group-disabled:bg-on-surface/[0.12]": disabled,
        },
      ],
      [ButtonVariant.Filled]: [
        "state-on-primary",
        {
          "group-disabled:bg-on-surface/[0.12]": disabled,
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
        {icon && (
          <Icon
            icon={faPlus}
            className={classNames("icon h-[18px] w-[18px]", {
              "text-primary ": variant == ButtonVariant.Elevated,
              "text-on-primary": variant == ButtonVariant.Filled,
              "group-disabled:text-on-surface":
                variant == ButtonVariant.Filled && disabled,
              "": variant == ButtonVariant.FilledTonal,
              "": variant == ButtonVariant.Outlined,
              "": variant == ButtonVariant.Text,
            })}
          />
        )}
        <span
          className={classNames("label-text", {
            "text-primary ": variant == ButtonVariant.Elevated,
            "text-on-primary": variant == ButtonVariant.Filled,
            "group-disabled:text-on-surface":
              variant == ButtonVariant.Filled && disabled,
            "": variant == ButtonVariant.FilledTonal,
            "": variant == ButtonVariant.Outlined,
            "": variant == ButtonVariant.Text,
          })}
        >
          {label}
        </span>
      </span>
    </ElementType>
  );
};

export default Button;
