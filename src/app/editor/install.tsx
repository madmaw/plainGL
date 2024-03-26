import { type Tree } from 'app/ui/components/tree/types';
import {
  type MutableProject,
  type Project,
} from './model';
import { install as installScene } from './scene/install';
import { type SceneNavigationItem } from './scene/navigation/types';
import { install as installSkeleton } from './skeleton/install';

import { type LinguiWrapper } from 'app/ui/lingui/types';
import {
  Aligner,
  Alignment,
} from 'ui/components/aligner';
import { GenericAsync } from 'ui/components/async/generic';

export function install({
  SceneNavigationTree,
  LinguiWrapper,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  LinguiWrapper: LinguiWrapper,
}) {
  const {
    SceneNavigation,
  } = installScene({
    SceneNavigationTree,
  });
  function DocumentNavigation({ project }: { project: Project }) {
    return <SceneNavigation scene={project.scenes[0]} />;
  }
  const Skeleton = installSkeleton({
    Navigation: DocumentNavigation,
  });

  async function loadMessages(locale: string) {
    const messages = await import(`./locales/${locale}.po`);
    // await delay(10000);
    // throw new Error('shit');
    return messages;
  }

  // TODO combine all async initialization tasks
  function ProjectEditor({
    project,
    locale,
  }: { project: MutableProject, locale: string }) {
    return (
      <Aligner
        xAlignment={Alignment.Middle}
        yAlignment={Alignment.Middle}
      >
        <LinguiWrapper
          Async={GenericAsync}
          loadMessages={loadMessages}
          locale={locale}
        >
          <Skeleton project={project} />
        </LinguiWrapper>
      </Aligner>
    );
  }

  return ProjectEditor;
}
