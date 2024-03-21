import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { install as installAysnc } from './async/install';
import { install as installIcons } from './icon/install';
import { install as installLoading } from './loading/install';
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
    SpinnerIcon,
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

  const {
    IndefiniteLoading,
  } = installLoading({
    SpinnerIcon,
  });

  const {
    IndefiniteAsync,
  } = installAysnc({
    Loading: IndefiniteLoading,
  });

  const { Tree } = installTree({
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
    metrics: metrics[Size.Medium],
  });

  return {
    Tree,
    typographicHierarchy,
    IndefiniteAsync,
  };
}
