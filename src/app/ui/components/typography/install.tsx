import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { createPartialObserverComponent } from 'base/react/partial';
import {
  TextAlignment,
  UnstyledText,
} from 'ui/components/typography/text';
import {
  FontStyle,
  FontWeight,
} from 'ui/components/typography/types';
import {
  type Text,
  TextType,
} from './types';

export function install({
  metrics,
  theme,
}: {
  metrics: Record<Size, Metrics>,
  theme: Theme,
}): Text {
  return createPartialObserverComponent(
    UnstyledText,
    function ({
      size = Size.Medium,
      type = TextType.Body,
      alignment = TextAlignment.Start,
    }: {
      size?: Size,
      type?: TextType,
      alignment?: TextAlignment,
    }) {
      const {
        typography,
      } = metrics[size];
      const {
        lineHeight,
        fontSize,
      } = typography[type];
      const fontWeight = type === TextType.Body
        ? FontWeight.Regular
        : FontWeight.Bold;
      return {
        lineHeight,
        fontSize,
        color: theme.foreground,
        fontFamily: theme.fontFamily,
        fontWeight,
        fontStyle: FontStyle.Normal,
        alignment,
      };
    },
  );
}
