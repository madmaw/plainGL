import { type Size } from 'app/ui/metrics';
import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';
import { type TextAlignment } from 'ui/components/typography/text';

export const enum TextType {
  Heading,
  Subheading,
  Body,
}

export type Text = ComponentType<PropsWithChildren<{
  alignment?: TextAlignment,
  size?: Size,
  type?: TextType,
}>>;
