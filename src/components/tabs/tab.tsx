import { FunctionComponent } from "react";
import { ClassNameHelper } from "@/components/utils/ClassNameHelper";
import { TabsVariant } from "@/components/tabs/tabs";
import { Icon } from "@/components/icon/icon";
import { faPlus, IconDefinition } from "@fortawesome/pro-regular-svg-icons";

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

  const getTabClass = ClassNameHelper.getFromVariant<TabsVariant>(variant, "", {
    [TabsVariant.Primary]: [],
    [TabsVariant.Secondary]: [],
  });

  const getStateLayerClass = ClassNameHelper.getFromVariant<TabsVariant>(
    variant,
    "",
    {
      [TabsVariant.Primary]: [],
      [TabsVariant.Secondary]: [],
    }
  );
  const getIconClass = ClassNameHelper.getFromVariant<TabsVariant>(
    variant,
    "",
    {
      [TabsVariant.Primary]: [],
      [TabsVariant.Secondary]: [],
    }
  );
  const getLabelTextClass = ClassNameHelper.getFromVariant<TabsVariant>(
    variant,
    "",
    {
      [TabsVariant.Primary]: [],
      [TabsVariant.Secondary]: [],
    }
  );
  return (
    <ElementType
      href={href}
      title={title}
      className={getTabClass}
      {...buttonProps}
      {...linkProps}
    >
      <span className={getStateLayerClass}>
        {icon && <Icon icon={faPlus} className={getIconClass} />}
        <span className={getLabelTextClass}>{label}</span>
      </span>
    </ElementType>
  );
};
