import { IconSVG } from './svg';
import { type IconProps } from './types';

export function TreeGuideIcon(props: IconProps & { lastChild: boolean }) {
  const {
    size,
    strokeWidth,
    lastChild,
  } = props;
  return (
    <IconSVG {...props}>
      <line
        x1={size / 2}
        y1={0}
        x2={size / 2}
        y2={lastChild ? size / 2 : size}
        strokeLinecap='square'
      />
      <line
        x1={size / 2}
        y1={size / 2}
        x2={size - strokeWidth}
        y2={size / 2}
        strokeLinecap='square'
      />
    </IconSVG>
  );
}
