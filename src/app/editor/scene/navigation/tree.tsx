import { createPartialComponent } from 'base/react/partial';
import { useCallback } from 'react';
import {
  ExpandOrCollapseIcon as ExpandedOrCollapsedIconImpl,
  TreeGuideIcon as TreeGuideIconImpl,
} from 'ui/components/icon/icons';
import { BaseTreeListItem } from 'ui/components/tree/base_item';
import { OpenOrCloseButton } from 'ui/components/tree/open_close_button';
import {
  Tree as TreeImpl,
  type TreeListItemProps,
  type TreeProps,
} from 'ui/components/tree/tree';
import { Typography } from 'ui/components/typography/types';
import { type SceneNavigationItem } from './types';

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

export const SceneNavigationTree = function ({
  items,
  onToggleOpen,
  TreeListItemContent,
}: Pick<
  TreeProps<SceneNavigationItem>,
  | 'items'
  | 'onToggleOpen'
> & {
  TreeListItemContent: React.ComponentType<SceneNavigationItem>,
}) {
  const TreeListItem = useCallback(
    function (props: TreeListItemProps<SceneNavigationItem>) {
      const BaseTreeListItemOfType = BaseTreeListItem<SceneNavigationItem>;
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

  const TreeImplOfType = TreeImpl<SceneNavigationItem>;
  return (
    <TreeImplOfType
      items={items}
      onToggleOpen={onToggleOpen}
      TreeListItem={TreeListItem}
    />
  );
};
