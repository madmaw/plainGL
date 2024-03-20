import styled from '@emotion/styled';
import { type Text } from 'app/ui/components/typography/types';
import { type ComponentType } from 'react';

export type SceneNavigationTreeListItemProps = {
  Icon?: ComponentType,
  name: string,
  Text: Text,
  gap: number,
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
}: SceneNavigationTreeListItemProps) {
  return (
    <Container gap={gap}>
      {Icon && <Icon />}
      <Text>
        {name}
      </Text>
    </Container>
  );
}
