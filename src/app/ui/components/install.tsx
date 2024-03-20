import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { install as installIcons } from './icon/install';
import { install as installTree } from './tree/install';
import { install as installTypography } from './typography/install';

export function install({
  metrics,
  theme,
}: {
  metrics: Record<Size, Metrics>,
  theme: Theme,
}) {
  const {
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
  } = installIcons({
    metrics,
    theme,
  });

  const {
    typographicHierarchy,
  } = installTypography({
    metrics,
    theme,
  });

  const { Tree } = installTree({
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
    metrics: metrics[Size.Medium],
  });

  return {
    Tree,
    typographicHierarchy,
  };
}
