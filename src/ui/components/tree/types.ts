export const enum PipeStyle {
  None = 0,
  Vertical = 1,
  Bent = 2,
  Split = 3,
}

export const enum OpenState {
  Open,
  Closed,
  Childless,
}

export type OpenCloseButton = React.ComponentType<{
  readonly pipes: readonly PipeStyle[],
  readonly open: OpenState,
  readonly onToggleOpen: () => void,
}>;
