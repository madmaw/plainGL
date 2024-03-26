import { ExpandOrCollapseIcon } from 'ui/components/icon/icons';
import { TreeGuideIcon } from 'ui/components/icon/icons';
import { install as installTree } from './tree/install';

export function install() {
  const { Tree } = installTree({
    ExpandedOrCollapsedIcon: ExpandOrCollapseIcon,
    TreeGuideIcon: TreeGuideIcon,
  });

  return {
    Tree,
  };
}
