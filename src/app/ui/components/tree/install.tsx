import { type Icon } from 'app/ui/components/icon/types';
import {
  type Metrics,
  Size,
} from 'app/ui/metrics';
import { createPartialComponent } from 'base/react/partial';
import { observer } from 'mobx-react';
import {
  useCallback,
  useMemo,
} from 'react';
import { type PipeStyle } from 'ui/components/icon/tree_guide';
import { BaseTreeListItem } from 'ui/components/tree/base_item';
import { OpenOrCloseButton } from 'ui/components/tree/open_close_button';
import {
  Tree as TreeImpl,
  type TreeListItemProps,
} from 'ui/components/tree/tree';
import { type TreeProps } from './types';

export function install({
  ExpandedOrCollapsedIcon: ExpandedOrCollapsedIconImpl,
  TreeGuideIcon: TreeGuideIconImpl,
  metrics,
}: {
  ExpandedOrCollapsedIcon: Icon<{ expanded: boolean }>,
  TreeGuideIcon: Icon<{ pipeStyle: PipeStyle }>,
  metrics: Metrics,
}) {
  const ExpandedOrCollapsedIcon = createPartialComponent(
    ExpandedOrCollapsedIconImpl,
    {
      size: Size.Small,
    },
  );

  const TreeGuideIcon = createPartialComponent(
    TreeGuideIconImpl,
    {
      size: Size.Small,
    },
  );

  const TreeOpenButton = createPartialComponent(
    OpenOrCloseButton,
    {
      ExpandedOrCollapsedIcon,
      TreeGuideIcon,
    },
  );

  const Tree = function<T,> ({
    items,
    onToggleOpen,
    TreeListItemContent,
  }: TreeProps<T>) {
    const TreeListItem = useCallback(
      function (props: TreeListItemProps<T>) {
        const BaseTreeListItemOfType = BaseTreeListItem<T>;
        return (
          <BaseTreeListItemOfType
            {...props}
            OpenButton={TreeOpenButton}
            ListItem={TreeListItemContent}
            gap={metrics.gridBaseline}
          />
        );
      },
      [TreeListItemContent],
    );

    // observe changes to metrics and hack around eslint not being able to reason about
    // creating an observer in the above useCallback
    const ObserverTreeListItem = useMemo(function () {
      return observer(TreeListItem);
    }, [TreeListItem]);

    const TreeImplOfType = TreeImpl<T>;
    return (
      <TreeImplOfType
        items={items}
        onToggleOpen={onToggleOpen}
        TreeListItem={ObserverTreeListItem}
      />
    );
  };

  return {
    Tree,
  };
}
