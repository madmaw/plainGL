import {
  type ComponentType,
  type PropsWithChildren,
} from 'react';

export type Text = ComponentType<PropsWithChildren>;

export type TypographicHierarchy = {
  Heading: Text,
  Subheading: Text,
  BodyText: Text,
};
