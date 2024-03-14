import { observable } from 'mobx';
import { type TypeDescriptor } from './types';

type UnionState<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol,
> = {
  readonly type: Key,
  readonly value: TypeDescriptors[Key]['aState'],
};

type UnionMutable<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol,
> = {
  readonly type: Key,
  value: TypeDescriptors[Key]['aMutable'],
};

class UnionTypeDescriptor<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol = keyof TypeDescriptors,
> implements TypeDescriptor<UnionState<TypeDescriptors, Key>, UnionMutable<TypeDescriptors, Key>> {
  constructor(private readonly typeDescriptors: TypeDescriptors) {}

  aState!: UnionState<TypeDescriptors, Key>;

  aMutable!: UnionMutable<TypeDescriptors, Key>;

  create({
    type,
    value,
  }: UnionState<TypeDescriptors, Key>): UnionMutable<TypeDescriptors, Key> {
    return observable({
      type,
      value: this.typeDescriptors[type].create(value),
    });
  }

  snapshot({
    type,
    value,
  }: UnionMutable<TypeDescriptors, Key>): UnionState<TypeDescriptors, Key> {
    return {
      type,
      value: this.typeDescriptors[type].snapshot(value),
    };
  }

  freeze({
    type,
    value,
  }: UnionState<TypeDescriptors, Key>): UnionState<TypeDescriptors, Key> {
    return {
      type,
      value: this.typeDescriptors[type].freeze(value),
    };
  }
}

export function unionDescriptor<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol = keyof TypeDescriptors,
>(typeDescriptors: TypeDescriptors) {
  return new UnionTypeDescriptor(typeDescriptors);
}
