import Color from 'colorjs.io';
import { IconSVG } from './svg';
import { type IconProps } from './types';

const TRANSPARENT = new Color('transparent');

export function SpinnerIcon(props: IconProps & {
  segments?: number,
  lineThickness?: number,
}) {
  const {
    height,
    color,
    strokeWidth,
    segments = 8,
  } = props;
  const radius = height / 2 - strokeWidth / 2;
  const dAngle = (Math.PI * 2) / segments;
  return (
    <IconSVG
      {...props}
      width={height}
    >
      {(new Array(segments)).fill(0).map(function (_, i) {
        const id = `lg${i}`;
        const fromAngle = i / (Math.PI * 2);
        const toAngle = (i + 1) / (Math.PI * 2);
        const fromColor = color.mix(TRANSPARENT, i / segments);
        const toColor = color.mix(TRANSPARENT, (i + 1) / segments);
        const x1 = Math.cos(fromAngle) * radius + height / 2;
        const y1 = Math.sin(fromAngle) * radius + height / 2;
        const x2 = Math.cos(toAngle) * radius + height / 2;
        const y2 = Math.sin(toAngle) * radius + height / 2;
        return (
          <>
            <linearGradient
              key={id}
              id={id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            >
              <stop
                offset='0%'
                stopColor={fromColor.toString()}
              />
              <stop
                offset='100%'
                stopColor={toColor.toString()}
              />
            </linearGradient>
            <path
              key={i}
              d={`M ${x1} ${y1} a${dAngle} ${dAngle} 0 0 1 ${x2} ${y2}`}
              fill='none'
              stroke={`#${id}`}
              strokeWidth={strokeWidth}
            />
          </>
        );
      })}
    </IconSVG>
  );
}
