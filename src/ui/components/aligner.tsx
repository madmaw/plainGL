import styled from '@emotion/styled';

export const enum Alignment {
  Start = 'start',
  Middle = 'center',
  End = 'end',
}

export const Aligner = styled.div<{ xAlignment: Alignment, yAlignment: Alignment }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ xAlignment }) => xAlignment};
  align-items: ${({ yAlignment }) => yAlignment};
`;
