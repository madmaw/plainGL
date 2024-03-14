// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypeDescriptor<StateType = any, MutableType = any> = {
  aState: StateType,

  aMutable: MutableType,

  // aDelta: DeltaType, ?

  create(s: StateType): MutableType,

  snapshot(m: MutableType): StateType,

  freeze(s: StateType): StateType,
};

export type TypeDescriptors = {
  [_: string]: TypeDescriptor,
};
