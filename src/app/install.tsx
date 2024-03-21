import { install as installEditor } from './editor/install';
import { install as installServices } from './services/fake/install';
import { install as installUI } from './ui/install';
import { Size } from './ui/metrics';

export function install() {
  const services = installServices();

  const {
    Tree,
    typographicHierarchy,
    metrics,
    LinguiWrapper,
  } = installUI(services);

  const Editor = installEditor({
    SceneNavigationTree: Tree,
    typographicHierarchy,
    metrics: metrics[Size.Medium],
    LinguiWrapper,
  });

  return Editor;
}
