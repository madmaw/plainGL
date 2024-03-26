import { checkExists } from 'base/preconditions';
import {
  createContext,
  type PropsWithChildren,
  useContext,
} from 'react';
import { type Typography } from './components/typography/types';

export const enum Size {
  Small = 1,
  Medium,
  Large,
}

// force compiler to check that all sizes are handled
const _SIZES: Record<Size, null> = {
  [Size.Small]: null,
  [Size.Medium]: null,
  [Size.Large]: null,
};
export const SIZES: Size[] = Object.keys(_SIZES).map(Number);

export type Metrics = {
  gridBaseline: number,
  typography: Record<Typography, {
    fontSize: number,
    lineHeight: number,
  }>,
  borderWidth: number,
  borderRadius: number,
  strokeWidth: number,
};

// TODO store Record<Size, Metrics> and have context for size too
// and have <Bigger> <Smaller> helpers

const metricsContext = createContext<Metrics | undefined>(undefined);

export function MetricsProvider({
  metrics,
  children,
}: PropsWithChildren<{ metrics: Metrics }>) {
  const { Provider } = metricsContext;
  return (
    <Provider value={metrics}>
      {children}
    </Provider>
  );
}

export function useMetrics(): Metrics {
  return checkExists(useContext(metricsContext), 'no metrics context set');
}
