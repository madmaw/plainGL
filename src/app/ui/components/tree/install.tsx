import { type Metrics } from 'app/ui/metrics';
import { observer } from 'mobx-react';
import {
  useCallback,
  useMemo,
} from 'react';
import { UnstyledButton } from 'ui/components/button/unstyled';
import {
  BaseTreeListItem,
  type GuideIcon,
} from 'ui/components/tree/base_item';
import {
  Tree as TreeImpl,
  type TreeListItemProps,
} from 'ui/components/tree/tree';
import { type TreeProps } from './types';

export function install({
  ExpandedOrCollapsedIcon,
  TreeGuideIcon,
  metrics,
}: {
  ExpandedOrCollapsedIcon: React.ComponentType<{ expanded: boolean }>,
  TreeGuideIcon: GuideIcon | undefined,
  metrics: Metrics,
}) {
  const TreeOpenButton = function ({
    open,
    onToggleOpen,
  }: { open: boolean, onToggleOpen: () => void }) {
    return (
      <UnstyledButton onClick={onToggleOpen}>
        <ExpandedOrCollapsedIcon expanded={open} />
      </UnstyledButton>
    );
  };

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
            GuideIcon={TreeGuideIcon}
            depthIndentPx={metrics.gridBaseline}
            ListItem={TreeListItemContent}
          />
        );
      },
      [TreeListItemContent],
    );

    // observe changes to metrics and hack around eslint not being able to reason about this
    // in a useCallback
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
