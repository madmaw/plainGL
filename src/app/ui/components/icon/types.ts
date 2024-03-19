import { type Size } from 'app/ui/metrics';

export type IconProps = {
  size: Size,
};

export type Icon<P = {}> = React.ComponentType<IconProps & P>;
