import { IconSVG } from './svg';
import { type IconProps } from './types';

export const enum PipeStyle {
  None = 0,
  Vertical = 1,
  Bent = 2,
  Split = 3,
}

export function TreeGuideIcon(props: IconProps & { pipeStyle: PipeStyle }) {
  const {
    size,
    strokeWidth,
    pipeStyle,
  } = props;
  return (
    <IconSVG {...props}>
      {pipeStyle !== PipeStyle.None && (
        <>
          <line
            x1={size / 2}
            y1={0}
            x2={size / 2}
            y2={pipeStyle === PipeStyle.Bent ? size / 2 : size}
            strokeLinecap='square'
          />
          {pipeStyle !== PipeStyle.Vertical && (
            <line
              x1={size / 2}
              y1={size / 2}
              x2={size - strokeWidth}
              y2={size / 2}
              strokeLinecap='square'
            />
          )}
        </>
      )}
    </IconSVG>
  );
}
