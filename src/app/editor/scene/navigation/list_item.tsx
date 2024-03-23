import styled from '@emotion/styled';
import { type Icon } from 'app/ui/components/icon/types';
import { type Text } from 'app/ui/components/typography/types';
import { type Size } from 'app/ui/metrics';

export type SceneNavigationTreeListItemProps = {
  Icon?: Icon,
  name: string,
  Text: Text,
  gap: number,
  size: Size,
};

const Container = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  gap: ${({ gap }) => gap}px;
`;

export function SceneNavigationTreeListItem({
  Text,
  Icon,
  name,
  gap,
  size,
}: SceneNavigationTreeListItemProps) {
  return (
    <Container gap={gap}>
      {Icon && <Icon size={size} />}
      <Text size={size}>
        {name}
      </Text>
    </Container>
  );
}
