import Color from 'colorjs.io';
import { type LoggingService } from 'service/logging';
import {
  FontStyle,
  FontWeight,
  Typography,
} from 'ui/components/typography/types';
import {
  type Metrics,
  Size,
  SIZES,
} from 'ui/metrics';
import { type Theme } from 'ui/theme';
import { install as installLinguiWrapper } from './lingui/install';

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
      typography: {
        [Typography.Body]: {
          lineHeight: 24,
          fontSize: 16,
        },
        [Typography.Subheading]: {
          lineHeight: 24,
          fontSize: 16,
        },
        [Typography.Heading]: {
          lineHeight: 32,
          fontSize: 24,
        },
      },
    },
    [Size.Medium]: {
      borderWidth: 1,
      borderRadius: 4,
      typography: {
        [Typography.Body]: {
          lineHeight: 32,
          fontSize: 24,
        },
        [Typography.Subheading]: {
          lineHeight: 32,
          fontSize: 24,
        },
        [Typography.Heading]: {
          lineHeight: 48,
          fontSize: 32,
        },
      },
    },
    [Size.Large]: {
      borderWidth: 1,
      borderRadius: 8,
      typography: {
        [Typography.Body]: {
          lineHeight: 48,
          fontSize: 32,
        },
        [Typography.Subheading]: {
          lineHeight: 48,
          fontSize: 32,
        },
        [Typography.Heading]: {
          lineHeight: 64,
          fontSize: 48,
        },
      },
    },
  };

  const theme: Theme = {
    foreground: new Color('black'),
    background: new Color('white'),
    typography: {
      [Typography.Body]: {
        fontFamily: 'sans-serif',
        fontStyle: FontStyle.Normal,
        fontWeight: FontWeight.Regular,
      },
      [Typography.Subheading]: {
        fontFamily: 'serif',
        fontStyle: FontStyle.Normal,
        fontWeight: FontWeight.Bold,
      },
      [Typography.Heading]: {
        fontFamily: 'serif',
        fontStyle: FontStyle.Normal,
        fontWeight: FontWeight.Bold,
      },
    },
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

  const LinguiWrapper = installLinguiWrapper({
    loggingService,
  });
  return {
    metrics,
    theme,
    LinguiWrapper,
  };
}
