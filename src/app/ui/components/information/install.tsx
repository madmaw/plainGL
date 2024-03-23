import { type Text } from 'app/ui/components/typography/types';
import { createPartialComponent } from 'base/react/partial';
import { Information } from './information';

export function install({
  Text,
}: {
  Text: Text,
}) {
  return createPartialComponent(Information, {
    Text,
  });
}
