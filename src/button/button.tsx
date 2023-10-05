import type { FunctionComponent } from 'react';
import { Icon } from '../icon';

import { StylingHelper } from '../utils';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export enum ButtonVariant {
  Filled = 'filled',
  Elevated = 'elevated',
  Outlined = 'outlined',
  Text = 'text',
  FilledTonal = 'tonal',
}

export interface ButtonProps {
  href?: string;
  disabled?: boolean;
  title?: string;
  label: string;
  icon?: IconDefinition;
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
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
  const ElementType = href ? 'a' : 'button';

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

  const getButtonClass = StylingHelper.classNames([
    'button group rounded-full',
    {
      applyWhen: variant == ButtonVariant.Elevated,
      styles: [
        {
          'bg-surface-container-low': !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Filled,
      styles: [
        {
          'bg-primary': !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.FilledTonal,
      styles: [
        {
          'bg-secondary-container': !disabled,
        },
      ],
    },
  ]);

  const getStateLayerClass = StylingHelper.classNames([
    'state-layer flex gap-2 justify-center rounded-full  items-center px-6 py-2.5',
    {
      applyWhen: variant == ButtonVariant.Elevated,
      styles: [
        {
          'group-disabled:bg-on-surface/[0.12]': disabled,
          'state-primary shadow-1  group-hover:shadow-2': !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Filled,
      styles: [
        {
          'group-disabled:bg-on-surface/[0.12]': disabled,
          'state-on-primary group-hover:shadow-1': !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.FilledTonal,
      styles: [
        {
          'group-disabled:bg-on-surface/[0.12]': disabled,
          'state-on-secondary-container group-hover:shadow-1': !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Outlined,
      styles: [
        ' border',
        {
          'group-disabled:border-on-surface/[0.12]': disabled,
          'state-primary border-outline state-primary group-focus:border-primary':
            !disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Text,
      styles: [
        {
          'state-primary': !disabled,
        },
      ],
    },
  ]);
  const getIconClass = StylingHelper.classNames([
    'icon h-[18px] w-[18px]',
    {
      applyWhen: variant == ButtonVariant.Elevated,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[38%]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Filled,
      styles: [
        {
          'text-on-primary': !disabled,
          'group-disabled:text-on-surface/[38%]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.FilledTonal,
      styles: [
        {
          'text-on-secondary-container': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Outlined,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Text,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
  ]);
  const getLabelTextClass = StylingHelper.classNames([
    'label-text',
    {
      applyWhen: variant == ButtonVariant.Elevated,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[38%]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Filled,
      styles: [
        {
          'text-on-primary': !disabled,
          'group-disabled:text-on-surface/[38%]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.FilledTonal,
      styles: [
        {
          'text-on-secondary-container': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Outlined,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
    {
      applyWhen: variant == ButtonVariant.Text,
      styles: [
        {
          'text-primary': !disabled,
          'group-disabled:text-on-surface/[0.38]': disabled,
        },
      ],
    },
  ]);

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
