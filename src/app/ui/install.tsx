import Color from 'colorjs.io';
import { type LoggingService } from 'service/logging';
import { install as installComponents } from './components/install';
import { install as installLinguiWrapper } from './lingui/install';
import {
  type Metrics,
  Size,
  SIZES,
} from './metrics';
import { type Theme } from './theme';

type SizedMetrics = Omit<Metrics, 'gridBaseline' | 'strokeWidth'>;

export function install({
  loggingService,
}: {
  loggingService: LoggingService,
}) {
  const sizedMetrics: Record<Size, SizedMetrics> = {
    [Size.Small]: {
      borderWidth: 1,
      borderRadius: 2,
      lineHeight: 12,
      fontSize: 8,
    },
    [Size.Medium]: {
      borderWidth: 1,
      borderRadius: 4,
      lineHeight: 24,
      fontSize: 16,
    },
    [Size.Large]: {
      borderWidth: 1,
      borderRadius: 8,
      lineHeight: 48,
      fontSize: 32,
    },
  };

  const theme: Theme = {
    foreground: new Color('black'),
    background: new Color('white'),
    fontFamily: 'sans-serif',
  };

  const metrics = SIZES.reduce(function (acc, size) {
    const metrics: Metrics = {
      gridBaseline: 8,
      strokeWidth: 1,
      ...sizedMetrics[size],
    };
    acc[size] = metrics;
    return acc;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  }, {} as Record<Size, Metrics>);

  const components = installComponents({
    metrics,
    theme,
  });
  const LinguiWrapper = installLinguiWrapper({
    loggingService,
  });
  return {
    ...components,
    metrics,
    theme,
    LinguiWrapper,
  };
}
