import Color from 'colorjs.io';
import { type LoggingService } from 'service/logging';
import { install as installComponents } from './components/install';
import { TextType } from './components/typography/types';
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
      typography: {
        [TextType.Body]: {
          lineHeight: 24,
          fontSize: 16,
        },
        [TextType.Subheading]: {
          lineHeight: 24,
          fontSize: 16,
        },
        [TextType.Heading]: {
          lineHeight: 32,
          fontSize: 24,
        },
      },
    },
    [Size.Medium]: {
      borderWidth: 1,
      borderRadius: 4,
      typography: {
        [TextType.Body]: {
          lineHeight: 32,
          fontSize: 24,
        },
        [TextType.Subheading]: {
          lineHeight: 32,
          fontSize: 24,
        },
        [TextType.Heading]: {
          lineHeight: 48,
          fontSize: 32,
        },
      },
    },
    [Size.Large]: {
      borderWidth: 1,
      borderRadius: 8,
      typography: {
        [TextType.Body]: {
          lineHeight: 48,
          fontSize: 32,
        },
        [TextType.Subheading]: {
          lineHeight: 48,
          fontSize: 32,
        },
        [TextType.Heading]: {
          lineHeight: 64,
          fontSize: 48,
        },
      },
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
