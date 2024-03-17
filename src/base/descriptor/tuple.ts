import { observable } from 'mobx';
import { type TypeDescriptor } from './types';

type TupleState<
  ElementTypeDescriptors extends readonly TypeDescriptor[],
> = Readonly<{
  [K in keyof ElementTypeDescriptors]: ElementTypeDescriptors[K]['aState'];
}>;

type TupleMutable<
  ElementTypeDescriptors extends readonly TypeDescriptor[],
> = {
  [K in keyof ElementTypeDescriptors]: ElementTypeDescriptors[K]['aMutable'];
};

class TupleTypeDescriptor<ElementTypeDescriptors extends readonly TypeDescriptor[]>
  implements TypeDescriptor<TupleState<ElementTypeDescriptors>, TupleMutable<ElementTypeDescriptors>>
{
  constructor(private readonly elementTypeDescriptors: ElementTypeDescriptors) {}

  aState!: TupleState<ElementTypeDescriptors>;

  aMutable!: TupleMutable<ElementTypeDescriptors>;

  create(s: TupleState<ElementTypeDescriptors>): TupleMutable<ElementTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return observable.array(
      s.map((v, i) => this.elementTypeDescriptors[i].create(v)),
    ) as TupleMutable<ElementTypeDescriptors>;
  }

  snapshot(m: TupleMutable<ElementTypeDescriptors>): TupleState<ElementTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return m.map((v, i) => this.elementTypeDescriptors[i].snapshot(v)) as TupleState<ElementTypeDescriptors>;
  }

  freeze(s: TupleState<ElementTypeDescriptors>): TupleState<ElementTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return Object.freeze(s.map((v, i) => this.elementTypeDescriptors[i].freeze(v))) as TupleState<
      ElementTypeDescriptors
    >;
  }
}

export function tupleDescriptor<
  ElementTypeDescriptors extends TypeDescriptor[],
>(elementTypeDescriptors: ElementTypeDescriptors) {
  return new TupleTypeDescriptor(elementTypeDescriptors);
}
