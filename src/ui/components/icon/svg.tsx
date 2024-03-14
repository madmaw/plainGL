import { type PropsWithChildren } from 'react';
import { type IconProps } from './types';

export function IconSVG({
  color,
  size,
  strokeWidth,
  children,
}: PropsWithChildren<IconProps>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
      stroke={color.toString()}
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      {children}
    </svg>
  );
}
