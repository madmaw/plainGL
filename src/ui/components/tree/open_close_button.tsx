import styled from '@emotion/styled';
import { UnstyledButton } from 'ui/components/button/unstyled';
// TODO move type into tree
import { type PipeStyle } from 'ui/components/icon/internal/tree_guide';
import { OpenState } from './tree';

const Container = styled.span`
    display: flex;
    flex-direction: row;
`;

export function OpenOrCloseButton({
  pipes,
  open,
  onToggleOpen,
  TreeGuideIcon,
  ExpandedOrCollapsedIcon,
}: {
  pipes: readonly PipeStyle[],
  open: OpenState,
  onToggleOpen: () => void,
  TreeGuideIcon: React.ComponentType<{ pipeStyle: PipeStyle }>,
  ExpandedOrCollapsedIcon: React.ComponentType<{ expanded: boolean }>,
}) {
  return (
    <UnstyledButton
      onClick={onToggleOpen}
      disabled={open === OpenState.Childless}
    >
      <Container>
        {pipes.map((pipeStyle, index) => (
          <TreeGuideIcon
            key={index}
            pipeStyle={pipeStyle}
          />
        ))}
        {open !== OpenState.Childless && (
          <ExpandedOrCollapsedIcon
            expanded={open === OpenState.Open}
          />
        )}
      </Container>
    </UnstyledButton>
  );
}
