import { type Tree } from 'app/ui/components/tree/types';
import { type TypographicHierarchy } from 'app/ui/components/typography/types';
import { type Metrics } from 'app/ui/metrics';
import { install as installNavigation } from './navigation/install';
import { type SceneNavigationItem } from './navigation/types';

export function install({
  SceneNavigationTree,
  typographicHierarchy,
  metrics,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  typographicHierarchy: TypographicHierarchy,
  metrics: Metrics,
}) {
  const SceneNavigation = installNavigation({
    SceneNavigationTree,
    typographicHierarchy,
    metrics,
  });

  return {
    SceneNavigation,
  };
}
