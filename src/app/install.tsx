import { type ComponentProps } from 'react';
import {
  MetricsProvider,
  Size,
  SizeProvider,
} from 'ui/metrics';
import { ThemeProvider } from 'ui/theme';
import { install as installEditor } from './editor/install';
import { install as installServices } from './services/fake/install';
import { install as installUI } from './ui/install';

export function install() {
  const services = installServices();

  const {
    LinguiWrapper,
    metrics,
    theme,
  } = installUI(services);

  const Editor = installEditor({
    LinguiWrapper,
  });

  // TODO routing

  return function (props: ComponentProps<typeof Editor>) {
    return (
      <ThemeProvider theme={theme}>
        <MetricsProvider metrics={metrics}>
          <SizeProvider size={Size.Medium}>
            <Editor {...props} />
          </SizeProvider>
        </MetricsProvider>
      </ThemeProvider>
    );
  };
}
