import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { type PropsWithChildren } from 'react';

export type SpinnerProps = PropsWithChildren<{
  durationMillis?: number,
}>;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<{ durationMillis: number }>`
  position: relative;
  transform-origin: 50% 50%;
  animation: ${spin} ${({ durationMillis }) => durationMillis}ms linear infinite;
`;

export function Spinner({
  durationMillis = 1000,
  children,
}: SpinnerProps) {
  return (
    <Container durationMillis={durationMillis}>
      {children}
    </Container>
  );
}
