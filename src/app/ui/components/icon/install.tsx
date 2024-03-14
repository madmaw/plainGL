import { type Metrics } from 'app/ui/metrics';
import { type Theme } from 'app/ui/theme';
import { createPartialObserverComponent } from 'base/react/partial';
import { ExpandedOrCollapsedIcon as ExpandedOrCollapsedIconImpl } from 'ui/components/icon/expanded_or_collapsed';
import { TreeGuideIcon as TreeGuideIconImpl } from 'ui/components/icon/tree_guide';
import { type IconProps } from 'ui/components/icon/types';

export function install({
  metrics,
  theme,
}: {
  metrics: Metrics,
  theme: Theme,
}) {
  const iconPropsSource: () => IconProps = function () {
    return {
      size: metrics.textLineHeight,
      color: theme.foreground,
      strokeWidth: metrics.strokeWidth,
    };
  };

  const TreeGuideIcon = createPartialObserverComponent(TreeGuideIconImpl, iconPropsSource);
  const ExpandedOrCollapsedIcon = createPartialObserverComponent(ExpandedOrCollapsedIconImpl, iconPropsSource);
  return {
    TreeGuideIcon,
    ExpandedOrCollapsedIcon,
  };
}
