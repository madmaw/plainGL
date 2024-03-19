import {
  type Metrics,
  type Size,
} from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { createPartialObserverComponent } from 'base/react/partial';
import { ExpandedOrCollapsedIcon as ExpandedOrCollapsedIconImpl } from 'ui/components/icon/expanded_or_collapsed';
import {
  type PipeStyle,
  TreeGuideIcon as TreeGuideIconImpl,
} from 'ui/components/icon/tree_guide';
import { type IconProps } from 'ui/components/icon/types';
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
      height: metrics[size].textLineHeight,
      color: theme.foreground,
      strokeWidth: metrics[size].strokeWidth,
    };
  };

  const TreeGuideIcon = createPartialObserverComponent(TreeGuideIconImpl, iconPropsSource);
  const ExpandedOrCollapsedIcon = createPartialObserverComponent(ExpandedOrCollapsedIconImpl, iconPropsSource);
  return {
    TreeGuideIcon,
    ExpandedOrCollapsedIcon,
  };
}
