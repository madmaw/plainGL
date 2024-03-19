import { IconSVG } from './svg';
import { type IconProps } from './types';

export function ExpandedOrCollapsedIcon(props: IconProps & { expanded: boolean }) {
  const {
    height,
    strokeWidth,
    expanded,
  } = props;
  const width = height / 2;
  const dimension = Math.min(width, height);
  const y = (height - dimension) / 2;
  const x = (width - dimension) / 2;
  return (
    <IconSVG
      {...props}
      width={width}
    >
      <rect
        x={x + strokeWidth}
        y={y + strokeWidth}
        width={dimension - strokeWidth * 2}
        height={dimension - strokeWidth * 2}
        rx={strokeWidth}
        ry={strokeWidth}
      />
      <line
        x1={x + strokeWidth * 4}
        y1={y + dimension / 2}
        x2={x + dimension - strokeWidth * 4}
        y2={y + dimension / 2}
      />
      {expanded && (
        <>
          <line
            x1={x + dimension / 2}
            y1={y + strokeWidth * 4}
            x2={x + dimension / 2}
            y2={y + dimension - strokeWidth * 4}
          />
          <line
            x1={x + dimension / 2}
            y1={y + dimension}
            x2={x + dimension / 2}
            y2={height}
          />
        </>
      )}
    </IconSVG>
  );
}
