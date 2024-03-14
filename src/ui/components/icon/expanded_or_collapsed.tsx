import { IconSVG } from './svg';
import { type IconProps } from './types';

export function ExpandedOrCollapsedIcon(props: IconProps & { expanded: boolean }) {
  const {
    size,
    strokeWidth,
    expanded,
  } = props;
  return (
    <IconSVG {...props}>
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={size - strokeWidth * 2}
        height={size - strokeWidth * 2}
        rx={strokeWidth}
        ry={strokeWidth}
      />
      <line
        x1={strokeWidth * 2}
        y1={size / 2}
        x2={size - strokeWidth * 4}
        y2={size / 2}
      />
      {expanded && (
        <line
          x1={size / 2}
          y1={strokeWidth * 2}
          x2={size / 2}
          y2={size - strokeWidth * 4}
        />
      )}
    </IconSVG>
  );
}
