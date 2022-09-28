import { createElement, FC, PropsWithChildren } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';

enum Types {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  body1 = 'p',
  body2 = 'p',
  body3 = 'p',
  body4 = 'p',
  body5 = 'p',
  label1 = 'p',
  label2 = 'p',
  label3 = 'p',
  label4 = 'p',
}

export interface TypographyProps {
  type: keyof typeof Types;
  align?: 'center' | 'left' | 'right';
  weight?: 'light' | 'normal' | 'medium';
  height?: number | string;
  spacing?: number | string;
  color?: 'default' | 'white' | 'black' | 'blue' | 'turquoise' | 'lime' | 'violet';
  isUpper?: boolean;
  className?: string;
}

/**
 * @param {'center' | 'left' | 'right'} [align = 'left'] - text align
 * * center
 * * left
 * * right
 * @param {'normal' | 'medium' | 'semiBold' | 'bold'} [weight = ''] - text font weight
 * * light = 300
 * * normal = 400
 * * medium = 500
 * @param {'normal' | 'medium' | 'semiBold' | 'bold'} [type = ''] - text type
 * * h1 = h1 / 420px,
 * * h2 = h2 / 96px,
 * * h3 = h3 / 96px,
 * * h4 = h4 / 64px,
 * * h5 = h5 / 64px,
 * * h6 = h6 / 48px,
 * * body1 = p / 36px,
 * * body2 = p / 30px,
 * * body3 = p / 18px,
 * * body4 = p / 14px,
 * * body5 = p / 14px,
 * * label1 = p / 48px,
 * * label2 = p / 14px,
 * * label3 = p / 24px,
 * * label3 = p / 24px,
 * * label4 = p / 20px,
 * @param height
 * @param spacing
 * @param color
 * @param isUpper
 * @param className
 * @param children
 * @param rest
 */
export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  type,
  align = 'left',
  weight,
  height,
  spacing,
  color = 'white',
  isUpper = false,
  className,
  children,
  ...rest
}) => {
  const styles = {
    lineHeight: height && `${height}px`,
    letterSpacing: spacing && `${spacing}em`,
    textTransform: isUpper && 'uppercase',
  };
  const props = {
    className: cn(s.typography, s[type], align && s[align], weight && s[weight], s[color], className),
    style: styles,
    ...rest,
  };
  return createElement(Types[type], props, children);
};
