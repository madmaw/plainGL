import { install as installEditor } from './editor/install';
import { install as installComponnets } from './ui/components/install';

export function install() {
  const { MasterDetail } = installComponnets();
  const Editor = installEditor();
  return Editor;
}
