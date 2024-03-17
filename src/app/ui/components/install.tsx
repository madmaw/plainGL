import { type Metrics } from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { install as installIcons } from './icon/install';
import { install as installTree } from './tree/install';

export function install({
  metrics,
  theme,
}: {
  metrics: Metrics,
  theme: Theme,
}) {
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
  });

  return {
    Tree,
  };
}
