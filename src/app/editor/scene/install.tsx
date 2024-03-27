import { type Tree } from 'app/ui/components/tree/types';
import { install as installNavigation } from './navigation/install';
import { type SceneNavigationItem } from './navigation/types';

export function install({
  SceneNavigationTree,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
}) {
  const SceneNavigation = installNavigation({
    SceneNavigationTree,
  });

  return {
    SceneNavigation,
  };
}
