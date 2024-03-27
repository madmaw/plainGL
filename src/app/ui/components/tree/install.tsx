import { createPartialComponent } from 'base/react/partial';
import { observer } from 'mobx-react';
import {
  useCallback,
  useMemo,
} from 'react';
import { type Icon } from 'ui/components/icon/icons';
import { BaseTreeListItem } from 'ui/components/tree/base_item';
import { OpenOrCloseButton } from 'ui/components/tree/open_close_button';
import {
  Tree as TreeImpl,
  type TreeListItemProps,
} from 'ui/components/tree/tree';
import { type PipeStyle } from 'ui/components/tree/types';
import { Typography } from 'ui/components/typography/types';
import { type TreeProps } from './types';

export function install({
  ExpandedOrCollapsedIcon: ExpandedOrCollapsedIconImpl,
  TreeGuideIcon: TreeGuideIconImpl,
}: {
  ExpandedOrCollapsedIcon: Icon<{ expanded: boolean }>,
  TreeGuideIcon: Icon<{ pipeStyle: PipeStyle }>,
}) {
  const ExpandedOrCollapsedIcon = createPartialComponent(
    ExpandedOrCollapsedIconImpl,
    {
      type: Typography.Body,
    },
  );

  const TreeGuideIcon = createPartialComponent(
    TreeGuideIconImpl,
    {
      type: Typography.Body,
    },
  );

  const TreeOpenCloseButton = createPartialComponent(
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
            OpenCloseButton={TreeOpenCloseButton}
            ListItem={TreeListItemContent}
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
