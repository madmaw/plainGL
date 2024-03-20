import { install as installEditor } from './editor/install';
import { install as installUI } from './ui/install';
import { Size } from './ui/metrics';

export function install() {
  const {
    Tree,
    typographicHierarchy,
    metrics,
  } = installUI();
  const Editor = installEditor({
    SceneNavigationTree: Tree,
    typographicHierarchy,
    metrics: metrics[Size.Medium],
  });
  return Editor;
}
