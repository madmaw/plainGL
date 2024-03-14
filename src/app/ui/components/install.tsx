import { type Metrics } from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import Color from 'colorjs.io';
import { install as installIcons } from './icon/install';
import { install as installTree } from './tree/install';

export function install() {
  const metrics: Metrics = {
    borderRadius: 2,
    borderWidth: 1,
    gridBaseline: 8,
    strokeWidth: 2,
    textLineHeight: 16,
  };

  const theme: Theme = {
    foreground: new Color('black'),
    background: new Color('white'),
  };

  const {
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
  } = installIcons({
    metrics,
    theme,
  });

  const { Tree } = installTree({
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
    metrics,
  });

  return {
    Tree,
  };
}
