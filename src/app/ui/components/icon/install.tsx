import { TextType } from 'app/ui/components/typography/types';
import {
  type Metrics,
  type Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import {
  createPartialComponent,
  createPartialObserverComponent,
} from 'base/react/partial';
import { AlertIcon as AlertIconImpl } from 'ui/components/icon/alert';
import { ExpandedOrCollapsedIcon as ExpandedOrCollapsedIconImpl } from 'ui/components/icon/expanded_or_collapsed';
import { SpinnerIcon as SpinnerIconImpl } from 'ui/components/icon/spinner';
import {
  type PipeStyle,
  TreeGuideIcon as TreeGuideIconImpl,
} from 'ui/components/icon/tree_guide';
import { type IconProps } from 'ui/components/icon/types';
import { LoadingIcon as LoadingIconImpl } from './loading';
import { type Icon } from './types';

export type Icons = {
  TreeGuideIcon: Icon<{ pipeStyle: PipeStyle }>,
  ExpandedOrCollapsedIcon: Icon<{ expanded: boolean }>,
};

export function install({
  metrics,
  theme,
}: {
  metrics: Record<Size, Metrics>,
  theme: Theme,
}) {
  const iconPropsSource: ({ size }: { size: Size }) => IconProps = function ({ size }) {
    return {
      height: metrics[size].typography[TextType.Body].lineHeight,
      color: theme.foreground,
      strokeWidth: metrics[size].strokeWidth,
    };
  };

  const AlertIcon = createPartialObserverComponent(AlertIconImpl, iconPropsSource);
  const ExpandedOrCollapsedIcon = createPartialObserverComponent(ExpandedOrCollapsedIconImpl, iconPropsSource);
  const SpinnerIcon = createPartialObserverComponent(SpinnerIconImpl, iconPropsSource);
  const LoadingIcon = createPartialComponent(LoadingIconImpl, {
    SpinnerIcon,
  });
  const TreeGuideIcon = createPartialObserverComponent(TreeGuideIconImpl, iconPropsSource);
  return {
    AlertIcon,
    ExpandedOrCollapsedIcon,
    LoadingIcon,
    SpinnerIcon,
    TreeGuideIcon,
  };
}
