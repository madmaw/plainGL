import styled from '@emotion/styled';
import type Color from 'colorjs.io';
import { type PropsWithChildren } from 'react';
import {
  type FontStyle,
  type FontWeight,
} from './types';

export type TextProps = PropsWithChildren<{
  fontFamily: string,
  fontSize: number,
  fontStyle: FontStyle,
  fontWeight: FontWeight,
  lineHeight: number,
  color: Color,
}>;

export const Text = styled.span<TextProps>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}px;
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight }) => lineHeight}px;
  color: ${({ color }) => color.toString()}
`;
