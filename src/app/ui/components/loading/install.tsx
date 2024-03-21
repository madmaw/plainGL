import { type Icon } from 'app/ui/components/icon/types';
import { createPartialComponent } from 'base/react/partial';
import { IndefiniteLoading as IndefiniteLoadingImpl } from './indefinite';

export function install({
  SpinnerIcon,
}: {
  SpinnerIcon: Icon,
}) {
  const IndefiniteLoading = createPartialComponent(IndefiniteLoadingImpl, {
    SpinnerIcon,
  });

  return {
    IndefiniteLoading,
  };
}
