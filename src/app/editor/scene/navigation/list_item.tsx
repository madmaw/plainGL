import styled from '@emotion/styled';
import { type Icon } from 'ui/components/icon/icons';
import { Text } from 'ui/components/typography/text';
import { Typography } from 'ui/components/typography/types';

export type SceneNavigationTreeListItemProps = {
  Icon?: Icon,
  name: string,
  gap: number,
};

const Container = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  gap: ${({ gap }) => gap}px;
`;

export function SceneNavigationTreeListItem({
  Icon,
  name,
  gap,
}: SceneNavigationTreeListItemProps) {
  return (
    <Container gap={gap}>
      {Icon && <Icon type={Typography.Body} />}
      <Text type={Typography.Body}>
        {name}
      </Text>
    </Container>
  );
}
