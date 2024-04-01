import { delay } from 'base/delay';
import {
  type MutableProject,
  type Project,
} from './model';
import { install as installScene } from './scene/install';
import { install as installSkeleton } from './skeleton/install';

import { type LinguiWrapper } from 'app/ui/lingui/types';
import {
  Aligner,
  Alignment,
} from 'ui/components/aligner';
import { GenericAsync } from 'ui/components/async/generic';

export function install({
  LinguiWrapper,
}: {
  LinguiWrapper: LinguiWrapper,
}) {
  const {
    SceneNavigation,
  } = installScene();
  function DocumentNavigation({ project }: { project: Project }) {
    return <SceneNavigation scene={project.scenes[0]} />;
  }
  const Skeleton = installSkeleton({
    Navigation: DocumentNavigation,
  });

  async function loadMessages(locale: string) {
    const messages = await import(`./locales/${locale}.po`);
    await delay(1000);
    // throw new Error('shit');
    return messages;
  }

  // TODO combine all async initialization tasks
  // note that ling-ui initialization is a special case since we really need
  // internationalization to report errors correctly, so perhaps that one shouldn't
  // be combined
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
