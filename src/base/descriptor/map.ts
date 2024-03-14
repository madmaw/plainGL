import { observable } from 'mobx';
import { type TypeDescriptor } from './types';

type MapState<
  Key,
  ValueTypeDescriptor extends TypeDescriptor,
> = ReadonlyMap<Key, ValueTypeDescriptor['aState']>;

type MapMutable<
  Key,
  ValueTypeDescriptor extends TypeDescriptor,
> = Map<Key, ValueTypeDescriptor['aMutable']>;

class MapTypeDescriptor<
  Key,
  ValueTypeDescriptor extends TypeDescriptor,
> implements TypeDescriptor<MapState<Key, ValueTypeDescriptor>, MapMutable<Key, ValueTypeDescriptor>> {
  constructor(private readonly valueTypeDescriptor: ValueTypeDescriptor) {}

  aState!: MapState<Key, ValueTypeDescriptor>;

  aMutable!: MapMutable<Key, ValueTypeDescriptor>;

  create(s: MapState<Key, ValueTypeDescriptor>): MapMutable<Key, ValueTypeDescriptor> {
    return observable.map(
      new Map(Array.from(s.entries()).map(([
        k,
        v,
      ]) => [
        k,
        this.valueTypeDescriptor.create(v),
      ])),
    );
  }

  snapshot(m: MapMutable<Key, ValueTypeDescriptor>): MapState<Key, ValueTypeDescriptor> {
    return new Map(Array.from(m.entries()).map(([
      k,
      v,
    ]) => [
      k,
      this.valueTypeDescriptor.snapshot(v),
    ]));
  }

  freeze(s: MapState<Key, ValueTypeDescriptor>): MapState<Key, ValueTypeDescriptor> {
    // TODO mobx observable map
    return new Map(Array.from(s.entries()).map(([
      k,
      v,
    ]) => [
      k,
      this.valueTypeDescriptor.freeze(v),
    ]));
  }
}

export function mapDescriptor<
  Key,
  ValueTypeDescriptor extends TypeDescriptor,
>(valueTypeDescriptor: ValueTypeDescriptor) {
  return new MapTypeDescriptor<Key, ValueTypeDescriptor>(valueTypeDescriptor);
}
