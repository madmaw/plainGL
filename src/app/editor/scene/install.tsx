import { type Tree } from 'app/ui/components/tree/types';
import { type Text } from 'app/ui/components/typography/types';
import { type Metrics } from 'app/ui/metrics';
import { install as installNavigation } from './navigation/install';
import { type SceneNavigationItem } from './navigation/types';

export function install({
  SceneNavigationTree,
  Text,
  metrics,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  Text: Text,
  metrics: Metrics,
}) {
  const SceneNavigation = installNavigation({
    SceneNavigationTree,
    Text,
    metrics,
  });

  return {
    SceneNavigation,
  };
}
