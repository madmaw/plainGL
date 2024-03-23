import { install as installEditor } from './editor/install';
import { install as installServices } from './services/fake/install';
import { install as installUI } from './ui/install';
import { Size } from './ui/metrics';

export function install() {
  const services = installServices();

  const {
    Tree,
    Text,
    metrics,
    LinguiWrapper,
    GenericAsync,
  } = installUI(services);

  const Editor = installEditor({
    SceneNavigationTree: Tree,
    Text,
    metrics: metrics[Size.Medium],
    LinguiWrapper,
    Async: GenericAsync,
  });

  return Editor;
}
