import { type TypeDescriptor } from './types';

type DeferredState<DeferredToTypeDescriptor extends TypeDescriptor> = DeferredToTypeDescriptor['aState'];

type DeferredMutable<DeferredToTypeDescriptor extends TypeDescriptor> = DeferredToTypeDescriptor['aMutable'];

class DeferredTypeDescriptor<DeferredToTypeDescriptor extends TypeDescriptor>
  implements TypeDescriptor<DeferredState<DeferredToTypeDescriptor>, DeferredMutable<DeferredToTypeDescriptor>>
{
  private _d: DeferredToTypeDescriptor | undefined;

  constructor(private readonly deferred: () => DeferredToTypeDescriptor) {}

  aState!: DeferredState<DeferredToTypeDescriptor>;

  aMutable!: DeferredMutable<DeferredToTypeDescriptor>;

  private get d() {
    if (this._d == null) {
      this._d = this.deferred();
    }
    return this._d;
  }

  create(s: DeferredState<DeferredToTypeDescriptor>): DeferredMutable<DeferredToTypeDescriptor> {
    return this.d.create(s);
  }

  snapshot(m: DeferredMutable<DeferredToTypeDescriptor>): DeferredState<DeferredToTypeDescriptor> {
    return this.d.snapshot(m);
  }

  freeze(s: DeferredState<DeferredToTypeDescriptor>): DeferredState<DeferredToTypeDescriptor> {
    return this.d.freeze(s);
  }
}

export function deferredDescriptor<
  DeferredToTypeDescriptor extends TypeDescriptor,
>(deferred: () => DeferredToTypeDescriptor) {
  return new DeferredTypeDescriptor(deferred);
}
