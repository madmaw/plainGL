import { type PropsWithChildren } from 'react';
import { type IconProps } from './types';

export function IconSVG({
  color,
  width,
  height,
  strokeWidth,
  children,
}: PropsWithChildren<IconProps & { width: number }>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
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
