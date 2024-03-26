import { IconSVG } from './svg';
import { type IconProps } from './types';

export const enum PipeStyle {
  None = 0,
  Vertical = 1,
  Bent = 2,
  Split = 3,
}

export type TreeGuideProps = { pipeStyle: PipeStyle, width?: number };

export function TreeGuideIcon(props: IconProps & TreeGuideProps) {
  const {
    height,
    strokeWidth,
    color,
    pipeStyle,
    width = height / 2,
  } = props;
  return (
    <IconSVG
      {...props}
      width={width}
    >
      <g
        stroke={color.toString()}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      >
        {pipeStyle !== PipeStyle.None && (
          <>
            <line
              x1={width / 2}
              y1={0}
              x2={width / 2}
              y2={pipeStyle === PipeStyle.Bent ? height / 2 : height}
              strokeLinecap='square'
            />
            {pipeStyle !== PipeStyle.Vertical && (
              <line
                x1={width / 2}
                y1={height / 2}
                x2={width - strokeWidth}
                y2={height / 2}
                strokeLinecap='square'
              />
            )}
          </>
        )}
      </g>
    </IconSVG>
  );
}
