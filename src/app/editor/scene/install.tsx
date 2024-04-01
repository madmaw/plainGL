import { install as installNavigation } from './navigation/install';
import { install as installRender } from './render/install';

export function install() {
  const SceneNavigation = installNavigation();
  const SceneRender = installRender();

  return {
    SceneNavigation,
    SceneRender,
  };
}
