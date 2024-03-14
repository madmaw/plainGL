import { install as installSkeleton } from './skeleton/install';

export function install() {
  const Skeleton = installSkeleton();
  return Skeleton;
}
