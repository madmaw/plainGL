import { observable } from 'mobx';
import { type TypeDescriptor } from './types';

type TypedUnionState<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol,
> = {
  readonly type: Key,
  readonly value: TypeDescriptors[Key]['aState'],
};

type TypedUnionMutable<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol,
> = {
  readonly type: Key,
  value: TypeDescriptors[Key]['aMutable'],
};

class TypedUnionTypeDescriptor<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol = keyof TypeDescriptors,
> implements TypeDescriptor<TypedUnionState<TypeDescriptors, Key>, TypedUnionMutable<TypeDescriptors, Key>> {
  constructor(private readonly typeDescriptors: TypeDescriptors) {}

  aState!: TypedUnionState<TypeDescriptors, Key>;

  aMutable!: TypedUnionMutable<TypeDescriptors, Key>;

  create({
    type,
    value,
  }: TypedUnionState<TypeDescriptors, Key>): TypedUnionMutable<TypeDescriptors, Key> {
    return observable({
      type,
      value: this.typeDescriptors[type].create(value),
    });
  }

  snapshot({
    type,
    value,
  }: TypedUnionMutable<TypeDescriptors, Key>): TypedUnionState<TypeDescriptors, Key> {
    return {
      type,
      value: this.typeDescriptors[type].snapshot(value),
    };
  }

  freeze({
    type,
    value,
  }: TypedUnionState<TypeDescriptors, Key>): TypedUnionState<TypeDescriptors, Key> {
    return {
      type,
      value: this.typeDescriptors[type].freeze(value),
    };
  }
}

export function typedUnionDescriptor<
  TypeDescriptors extends Readonly<Record<Key, TypeDescriptor>>,
  Key extends string | number | symbol = keyof TypeDescriptors,
>(typeDescriptors: TypeDescriptors) {
  return new TypedUnionTypeDescriptor(typeDescriptors);
}
