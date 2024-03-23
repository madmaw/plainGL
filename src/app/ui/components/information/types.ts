import { type Icon } from 'app/ui/components/icon/types';
import { type ComponentType } from 'react';

export type InformationProps = {
  Icon?: Icon,
  heading?: string,
  message?: string,
};

export type Information = ComponentType<InformationProps>;
