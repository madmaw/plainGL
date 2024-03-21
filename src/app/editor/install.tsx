import { type Tree } from 'app/ui/components/tree/types';
import { type TypographicHierarchy } from 'app/ui/components/typography/types';
import { type Metrics } from 'app/ui/metrics';
import { Async as AsyncImpl } from 'ui/components/async';
import {
  type MutableProject,
  type Project,
} from './model';
import { install as installScene } from './scene/install';
import { type SceneNavigationItem } from './scene/navigation/types';
import { install as installSkeleton } from './skeleton/install';

import { type LinguiWrapper } from 'app/ui/lingui/types';
import { createPartialComponent } from 'base/react/partial';
import { type PropsWithChildren } from 'react';

export function install({
  SceneNavigationTree,
  typographicHierarchy,
  metrics,
  LinguiWrapper,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  typographicHierarchy: TypographicHierarchy,
  metrics: Metrics,
  LinguiWrapper: LinguiWrapper,
}) {
  const {
    SceneNavigation,
  } = installScene({
    SceneNavigationTree,
    typographicHierarchy,
    metrics,
  });
  function DocumentNavigation({ project }: { project: Project }) {
    return <SceneNavigation scene={project.scenes[0]} />;
  }
  const Skeleton = installSkeleton({
    Navigation: DocumentNavigation,
  });

  function Loading() {
    return 'Loading...';
  }

  function Failure() {
    return 'Error!';
  }

  function Success({ children }: PropsWithChildren) {
    return children;
  }

  const Async = createPartialComponent(AsyncImpl, {
    Loading,
    Failure,
    Success,
  });

  function loadMessages(locale: string) {
    return import(`./locales/${locale}.po`);
  }

  function ProjectEditor({
    project,
    locale,
  }: { project: MutableProject, locale: string }) {
    return (
      <LinguiWrapper
        Async={Async}
        loadMessages={loadMessages}
        locale={locale}
      >
        <Skeleton project={project} />
      </LinguiWrapper>
    );
  }

  return ProjectEditor;
}
