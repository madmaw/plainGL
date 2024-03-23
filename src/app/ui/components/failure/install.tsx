import { type Icon } from 'app/ui/components/icon/types';
import { type Information } from 'app/ui/components/information/types';
import { createPartialComponent } from 'base/react/partial';

export function install({
  FailureIcon,
  Information,
}: {
  FailureIcon: Icon,
  Information: Information,
}) {
  return createPartialComponent(Information, {
    Icon: FailureIcon,
  });
}
