import Color from 'colorjs.io';
import { install as installComponents } from './components/install';
import { type Metrics } from './metrics';
import { type Theme } from './theme';

export function install() {
  const metrics: Metrics = {
    borderRadius: 4,
    borderWidth: 1,
    gridBaseline: 8,
    strokeWidth: 1,
    textLineHeight: 16,
  };

  const theme: Theme = {
    foreground: new Color('black'),
    background: new Color('white'),
  };

  return installComponents({
    metrics,
    theme,
  });
}
