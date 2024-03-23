import { Spinner } from 'ui/components/loading/spinner';
import {
  type Icon,
  type IconProps,
} from './types';

export function LoadingIcon({
  SpinnerIcon,
  size,
}: IconProps & {
  SpinnerIcon: Icon,
}) {
  return (
    <Spinner>
      <SpinnerIcon size={size} />
    </Spinner>
  );
}
