import {
  createTypesafeProxy,
  type TypesafeProxyHandler,
} from 'base/typesafe_proxy';
import { observable } from 'mobx';
import {
  type TypeDescriptor,
  type TypeDescriptors,
} from './types';

type Mutable = {
  __aMutable: true,
};

type State = {
  // i don't know under what circumstances we would care that a mutable had been supplied as a readonly state
  // __aMutable?: never,
};

type RecordState<
  Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aState'] } & State;

type RecordMutable<
  Attributes extends TypeDescriptors,
> = { [K in keyof Attributes]: Attributes[K]['aMutable'] } & Mutable;

type RecordTarget<
  AttributeTypeDescriptors extends TypeDescriptors,
> = { [K in keyof AttributeTypeDescriptors]: AttributeTypeDescriptors[K]['aMutable'] };

class RecordProxyHandler<
  AttributeTypeDescriptors extends TypeDescriptors,
  K extends keyof AttributeTypeDescriptors = keyof AttributeTypeDescriptors,
> implements TypesafeProxyHandler<RecordTarget<AttributeTypeDescriptors>> {
  constructor() {
  }

  get(target: RecordTarget<AttributeTypeDescriptors>, p: K) {
    return target[p];
  }

  set(target: RecordTarget<AttributeTypeDescriptors>, p: K, newValue: unknown): boolean {
    target[p] = newValue;
    return true;
  }
}

class RecordTypeDescriptor<AttributeTypeDescriptors extends TypeDescriptors>
  implements TypeDescriptor<RecordState<AttributeTypeDescriptors>, RecordMutable<AttributeTypeDescriptors>>
{
  constructor(private readonly attributeTypes: AttributeTypeDescriptors) {}

  aState!: Readonly<RecordState<AttributeTypeDescriptors>>;

  aMutable!: RecordMutable<AttributeTypeDescriptors>;

  create(s: RecordState<AttributeTypeDescriptors>): RecordMutable<AttributeTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    const target: RecordTarget<AttributeTypeDescriptors> = observable({}) as any;
    for (const key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = s[key];
      const valueMutable = attributeType.create(value);
      target[key] = valueMutable;
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return createTypesafeProxy(target, new RecordProxyHandler()) as RecordMutable<AttributeTypeDescriptors>;
  }

  snapshot(m: RecordMutable<AttributeTypeDescriptors>): RecordState<AttributeTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    const snapshot: RecordState<AttributeTypeDescriptors> = {} as any;
    for (const key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = m[key];
      const valueMutable = attributeType.snapshot(value);
      snapshot[key] = valueMutable;
    }
    return snapshot;
  }

  freeze(s: RecordState<AttributeTypeDescriptors>): RecordState<AttributeTypeDescriptors> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    const snapshot: RecordState<AttributeTypeDescriptors> = {} as any;
    for (const key in this.attributeTypes) {
      const attributeType = this.attributeTypes[key];
      const value = s[key];
      const valueMutable = attributeType.freeze(value);
      snapshot[key] = valueMutable;
    }
    return Object.freeze(snapshot);
  }
}

export function recordDescriptor<
  AttributeTypeDescriptors extends TypeDescriptors,
>(attributeTypes: AttributeTypeDescriptors) {
  return new RecordTypeDescriptor(attributeTypes);
}
