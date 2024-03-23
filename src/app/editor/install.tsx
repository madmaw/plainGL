import { type Tree } from 'app/ui/components/tree/types';
import { type Metrics } from 'app/ui/metrics';
import {
  type MutableProject,
  type Project,
} from './model';
import { install as installScene } from './scene/install';
import { type SceneNavigationItem } from './scene/navigation/types';
import { install as installSkeleton } from './skeleton/install';

import { type GenericAsync } from 'app/ui/components/async/types';
import { type Text } from 'app/ui/components/typography/types';
import { type LinguiWrapper } from 'app/ui/lingui/types';
import {
  Aligner,
  Alignment,
} from 'ui/components/aligner';

export function install({
  SceneNavigationTree,
  Text,
  metrics,
  LinguiWrapper,
  Async,
}: {
  SceneNavigationTree: Tree<SceneNavigationItem>,
  Text: Text,
  metrics: Metrics,
  LinguiWrapper: LinguiWrapper,
  Async: GenericAsync,
}) {
  const {
    SceneNavigation,
  } = installScene({
    SceneNavigationTree,
    Text,
    metrics,
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
          Async={Async}
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
