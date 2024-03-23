import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { install as installAysnc } from './async/install';
import { install as installFailure } from './failure/install';
import { install as installIcons } from './icon/install';
import { install as installInformation } from './information/install';
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
    AlertIcon,
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
    LoadingIcon,
  } = installIcons({
    metrics,
    theme,
  });

  const Text = installTypography({
    metrics,
    theme,
  });

  const Information = installInformation({
    Text,
  });

  const IndefiniteLoadingInformation = installLoading({
    LoadingIcon,
    Information,
  });

  const FailureInformation = installFailure({
    FailureIcon: AlertIcon,
    Information,
  });

  const {
    GenericAsync,
  } = installAysnc({
    Loading: IndefiniteLoadingInformation,
    Failure: FailureInformation,
  });

  const { Tree } = installTree({
    ExpandedOrCollapsedIcon,
    TreeGuideIcon,
    metrics: metrics[Size.Medium],
  });

  return {
    Tree,
    Text,
    GenericAsync,
  };
}
