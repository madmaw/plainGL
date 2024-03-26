import { type PropsWithChildren } from 'react';
import { useMetrics } from 'ui/metrics';
import { useTheme } from 'ui/theme';
import { StyledText } from './internal/text';
import {
  TextAlignment,
  Typography,
} from './types';

export function Text({
  alignment = TextAlignment.Start,
  type = Typography.Body,
  children,
}: PropsWithChildren<{
  alignment?: TextAlignment,
  type?: Typography,
}>) {
  const {
    typography: metricsTypography,
  } = useMetrics();
  const {
    fontSize,
    lineHeight,
  } = metricsTypography[type];
  const {
    foreground,
    typography: themeTypography,
  } = useTheme();
  const {
    fontFamily,
    fontStyle,
    fontWeight,
  } = themeTypography[type];

  return (
    <StyledText
      alignment={alignment}
      foreground={foreground}
      fontFamily={fontFamily}
      fontSize={fontSize}
      lineHeight={lineHeight}
      fontStyle={fontStyle}
      fontWeight={fontWeight}
    >
      {children}
    </StyledText>
  );
}
