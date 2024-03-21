import { type Icon } from 'app/ui/components/icon/types';
import { type Size } from 'app/ui/metrics';
import { Spinner } from 'ui/components/loading/spinner';

export function IndefiniteLoading({
  SpinnerIcon,
  size,
}: { SpinnerIcon: Icon, size: Size }) {
  return (
    <Spinner>
      <SpinnerIcon size={size} />
    </Spinner>
  );
}
