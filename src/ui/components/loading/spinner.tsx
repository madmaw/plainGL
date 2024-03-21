import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { type PropsWithChildren } from 'react';

export type SpinnerProps = PropsWithChildren<{
  durationMillis?: number,
}>;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div<{ durationMillis: number }>`
  flex: 0;
  position: relative;
  transform-origin: 50% 50%;
  animation: ${spin} ${({ durationMillis }) => durationMillis}ms linear infinite;
`;

export function Spinner({
  durationMillis = 1000,
  children,
}: SpinnerProps) {
  return (
    <Container>
      <SpinnerContainer durationMillis={durationMillis}>
        {children}
      </SpinnerContainer>
    </Container>
  );
}
