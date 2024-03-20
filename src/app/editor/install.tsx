import { type Tree } from 'app/ui/components/tree/types';
import { type TypographicHierarchy } from 'app/ui/components/typography/types';
import { type Metrics } from 'app/ui/metrics';
import {
  observable,
  runInAction,
} from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { type MutableProject } from './model';
import { install as installScene } from './scene/install';
import { type SceneNavigationItem } from './scene/navigation/types';
import { install as installSkeleton } from './skeleton/install';

export function install({
  SceneNavigationTree,
  typographicHierarchy,
  metrics,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  typographicHierarchy: TypographicHierarchy,
  metrics: Metrics,
}) {
  const projectHolder = observable.box<MutableProject>();
  const {
    SceneNavigation,
  } = installScene({
    SceneNavigationTree,
    typographicHierarchy,
    metrics,
  });
  const DocumentNavigation = observer(
    function () {
      const project = projectHolder.get();
      if (project == null) {
        return null;
      }
      return <SceneNavigation scene={project.scenes[0]} />;
    },
  );
  const Skeleton = installSkeleton({
    Navigation: DocumentNavigation,
  });

  function ProjectEditor({ project }: { project: MutableProject }) {
    useEffect(function () {
      runInAction(function () {
        projectHolder.set(project);
      });
    }, [project]);
    return <Skeleton />;
  }

  return ProjectEditor;
}
