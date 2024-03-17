import { install as installEditor } from './editor/install';
import { install as installUI } from './ui/install';

export function install() {
  const {
    Tree,
  } = installUI();
  const Editor = installEditor({
    SceneNavigationTree: Tree,
  });
  return Editor;
}
