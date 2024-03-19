import {
  type RecordMutable,
  type RecordState,
} from './record';
import {
  type TypeDescriptor,
  type TypeDescriptors,
} from './types';

type RecordUnionState<
  Key extends string | symbol | number,
  AbsentTypeDescriptors extends (TypeDescriptors & { [K in Key]?: undefined }),
  PresentTypeDescriptors extends (TypeDescriptors & { [K in Key]: PresentValueDescriptor }),
  PresentValueDescriptor extends TypeDescriptor,
> = RecordState<AbsentTypeDescriptors> | RecordState<PresentTypeDescriptors>;

type RecordUnionMutable<
  Key extends string | symbol | number,
  AbsentTypeDescriptors extends (TypeDescriptors & { [K in Key]?: undefined }),
  PresentTypeDescriptors extends (TypeDescriptors & { [K in Key]: PresentValueDescriptor }),
  PresentValueDescriptor extends TypeDescriptor,
> = RecordMutable<AbsentTypeDescriptors> | RecordMutable<PresentTypeDescriptors>;

class RecordUnionTypeDescriptor<
  Key extends string | symbol | number,
  AbsentTypeDescriptors extends (TypeDescriptors & { [K in Key]?: undefined }),
  PresentTypeDescriptors extends (TypeDescriptors & { [K in Key]: PresentValueDescriptor }),
  PresentValueDescriptor extends TypeDescriptor,
> implements TypeDescriptor<
  RecordUnionState<Key, AbsentTypeDescriptors, PresentTypeDescriptors, PresentValueDescriptor>,
  RecordUnionMutable<Key, AbsentTypeDescriptors, PresentTypeDescriptors, PresentValueDescriptor>
> {
  constructor(
    private readonly key: Key,
    private readonly absentTypeDescriptor: TypeDescriptor<
      RecordState<AbsentTypeDescriptors>,
      RecordMutable<AbsentTypeDescriptors>
    >,
    private readonly presentTypeDescriptor: TypeDescriptor<
      RecordState<PresentTypeDescriptors>,
      RecordMutable<PresentTypeDescriptors>
    >,
  ) {
  }

  aState!: RecordUnionState<Key, AbsentTypeDescriptors, PresentTypeDescriptors, PresentValueDescriptor>;

  aMutable!: RecordUnionMutable<Key, AbsentTypeDescriptors, PresentTypeDescriptors, PresentValueDescriptor>;

  create(state: RecordUnionState<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  >): RecordUnionMutable<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  > {
    return state[this.key] == null
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ? this.absentTypeDescriptor.create(state as RecordState<AbsentTypeDescriptors>)
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      : this.presentTypeDescriptor.create(state as RecordState<PresentTypeDescriptors>);
  }

  snapshot(mutable: RecordUnionMutable<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  >): RecordUnionState<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  > {
    return mutable[this.key] == null
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ? this.absentTypeDescriptor.snapshot(mutable as RecordMutable<AbsentTypeDescriptors>)
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      : this.presentTypeDescriptor.snapshot(mutable as RecordMutable<PresentTypeDescriptors>);
  }

  freeze(state: RecordUnionState<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  >): RecordUnionState<
    Key,
    AbsentTypeDescriptors,
    PresentTypeDescriptors,
    PresentValueDescriptor
  > {
    return state[this.key] == null
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ? this.absentTypeDescriptor.snapshot(state as RecordMutable<AbsentTypeDescriptors>)
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      : this.presentTypeDescriptor.snapshot(state as RecordMutable<PresentTypeDescriptors>);
  }
}

export function recordUnionDescriptor<
  Key extends string | symbol | number,
  AbsentTypeDescriptors extends (TypeDescriptors & { [K in Key]?: undefined }),
  PresentTypeDescriptors extends (TypeDescriptors & { [K in Key]: PresentValueDescriptor }),
  PresentValueDescriptor extends TypeDescriptor = PresentTypeDescriptors[Key],
>(
  key: Key,
  absentTypeDescriptor: TypeDescriptor<
    RecordState<AbsentTypeDescriptors>,
    RecordMutable<AbsentTypeDescriptors>
  >,
  presentTypeDescriptor: TypeDescriptor<
    RecordState<PresentTypeDescriptors>,
    RecordMutable<PresentTypeDescriptors>
  >,
) {
  return new RecordUnionTypeDescriptor(
    key,
    absentTypeDescriptor,
    presentTypeDescriptor,
  );
}
