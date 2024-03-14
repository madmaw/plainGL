import { type TypeDescriptor } from './types';

export class LiteralTypeDescriptor<LiteralType> implements TypeDescriptor<LiteralType, LiteralType> {
  constructor() {}

  aState!: LiteralType;

  aMutable!: LiteralType;

  create(s: LiteralType): LiteralType {
    return s;
  }

  snapshot(m: LiteralType): LiteralType {
    return m;
  }

  freeze(s: LiteralType): LiteralType {
    return s;
  }
}
