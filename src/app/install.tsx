import { install as installEditor } from './editor/install';
import { install as installServices } from './services/fake/install';
import { install as installUI } from './ui/install';

export function install() {
  const services = installServices();

  const {
    Tree,
    LinguiWrapper,
  } = installUI(services);

  const Editor = installEditor({
    SceneNavigationTree: Tree,
    LinguiWrapper,
  });

  return Editor;
}
