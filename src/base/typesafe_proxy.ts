export type TypesafeProxyHandler<T extends object, K extends keyof T = keyof T> = {
  /**
   * A trap method for a function call.
   * @param target The original callable object which is being proxied.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply?(target: T, thisArg: any, argArray: any[]): any,

  /**
   * A trap for the `new` operator.
   * @param target The original object which is being proxied.
   * @param newTarget The constructor that was originally called.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  construct?(target: T, argArray: any[], newTarget: Function): object,

  /**
   * A trap for `Object.defineProperty()`.
   * @param target The original object which is being proxied.
   * @returns A `Boolean` indicating whether or not the property has been defined.
   */
  defineProperty?(target: T, property: K, attributes: PropertyDescriptor): boolean,

  /**
   * A trap for the `delete` operator.
   * @param target The original object which is being proxied.
   * @param p The name or `Symbol` of the property to delete.
   * @returns A `Boolean` indicating whether or not the property was deleted.
   */
  deleteProperty?(target: T, p: K): boolean,

  /**
   * A trap for getting a property value.
   * @param target The original object which is being proxied.
   * @param p The name or `Symbol` of the property to get.
   * @param receiver The proxy or an object that inherits from the proxy.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get?(target: T, p: K, receiver: any): T[K],

  /**
   * A trap for `Object.getOwnPropertyDescriptor()`.
   * @param target The original object which is being proxied.
   * @param p The name of the property whose description should be retrieved.
   */
  getOwnPropertyDescriptor?(target: T, p: K): PropertyDescriptor | undefined,

  /**
   * A trap for the `[[GetPrototypeOf]]` internal method.
   * @param target The original object which is being proxied.
   */
  getPrototypeOf?(target: T): object | null,

  /**
   * A trap for the `in` operator.
   * @param target The original object which is being proxied.
   * @param p The name or `Symbol` of the property to check for existence.
   */
  has?(target: T, p: K): boolean,

  /**
   * A trap for `Object.isExtensible()`.
   * @param target The original object which is being proxied.
   */
  isExtensible?(target: T): boolean,

  /**
   * A trap for `Reflect.ownKeys()`.
   * @param target The original object which is being proxied.
   */
  ownKeys?(target: T): ArrayLike<string | symbol>,

  /**
   * A trap for `Object.preventExtensions()`.
   * @param target The original object which is being proxied.
   */
  preventExtensions?(target: T): boolean,

  /**
   * A trap for setting a property value.
   * @param target The original object which is being proxied.
   * @param p The name or `Symbol` of the property to set.
   * @param receiver The object to which the assignment was originally directed.
   * @returns A `Boolean` indicating whether or not the property was set.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set?(target: T, p: K, newValue: T[K], receiver: any): boolean,

  /**
   * A trap for `Object.setPrototypeOf()`.
   * @param target The original object which is being proxied.
   * @param newPrototype The object's new prototype or `null`.
   */
  setPrototypeOf?(target: T, v: object | null): boolean,
};

class TypesafeProxyHandlerAdapter<T extends object, K extends keyof T> implements ProxyHandler<T> {
  constructor(private readonly handler: TypesafeProxyHandler<T, K>) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply(target: T, thisArg: any, argArray: any[]): any {
    return this.handler.apply?.(target, thisArg, argArray);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  construct(target: T, argArray: any[], newTarget: Function): object {
    return this.handler.construct?.(target, argArray, newTarget) || {};
  }

  defineProperty(target: T, property: string | symbol, attributes: PropertyDescriptor): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.defineProperty?.(target, property as K, attributes) || false;
  }

  deleteProperty(target: T, p: string | symbol): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.deleteProperty?.(target, p as K) || false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(target: T, p: string | symbol, receiver: any): T[K] {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.get?.(target, p as K, receiver) || target[p as K];
  }

  getOwnPropertyDescriptor(target: T, p: string | symbol): PropertyDescriptor | undefined {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.getOwnPropertyDescriptor?.(target, p as K);
  }

  getPrototypeOf(target: T): object | null {
    return this.handler.getPrototypeOf?.(target) || Object.getPrototypeOf(target);
  }

  has(target: T, p: string | symbol): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.has?.(target, p as K) || p in target;
  }

  isExtensible(target: T): boolean {
    return this.handler.isExtensible?.(target) || Object.isExtensible(target);
  }

  ownKeys(target: T): ArrayLike<string | symbol> {
    return this.handler.ownKeys?.(target) || Object.keys(target);
  }

  preventExtensions(target: T): boolean {
    return !!this.handler.preventExtensions?.(target);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set(target: T, p: string | symbol, newValue: T[K], receiver: any): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return this.handler.set?.(target, p as K, newValue, receiver) || false;
  }

  setPrototypeOf(target: T, v: object | null): boolean {
    return this.handler.setPrototypeOf?.(target, v) || false;
  }
}

export function createTypesafeProxy<T extends object, K extends keyof T = keyof T>(
  target: T,
  handler: TypesafeProxyHandler<T, K>,
): T {
  return new Proxy(target, new TypesafeProxyHandlerAdapter<T, K>(handler));
}
