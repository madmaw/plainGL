import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import {
  createPartialComponent,
  createPartialObserverComponent,
} from 'base/react/partial';
import { Text as TextImpl } from 'ui/components/typography/text';
import {
  FontStyle,
  FontWeight,
} from 'ui/components/typography/types';
import { type TypographicHierarchy } from './types';

export function install({
  metrics,
  theme,
}: {
  metrics: Record<Size, Metrics>,
  theme: Theme,
}): {
  typographicHierarchy: TypographicHierarchy,
} {
  const Text = createPartialObserverComponent(
    TextImpl,
    function ({ size }: { size: Size }) {
      const {
        lineHeight,
        fontSize,
      } = metrics[size];
      return {
        lineHeight,
        fontSize,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
      };
    },
  );

  const Heading = createPartialComponent(Text, {
    size: Size.Large,
    fontWeight: FontWeight.Bold,
    fontStyle: FontStyle.Normal,
  });

  const Subheading = createPartialComponent(Text, {
    size: Size.Medium,
    fontWeight: FontWeight.Bold,
    fontStyle: FontStyle.Normal,
  });

  const BodyText = createPartialComponent(Text, {
    size: Size.Medium,
    fontWeight: FontWeight.Regular,
    fontStyle: FontStyle.Normal,
  });

  return {
    typographicHierarchy: {
      Heading,
      Subheading,
      BodyText,
    },
  };
}
