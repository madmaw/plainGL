import { type Tree } from 'app/ui/components/tree/types';
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
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
}) {
  const projectHolder = observable.box<MutableProject>();
  const {
    SceneNavigation,
  } = installScene({
    SceneNavigationTree,
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
