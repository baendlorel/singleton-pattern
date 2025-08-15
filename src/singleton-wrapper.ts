import { ProxyConstruct } from './native.js';

class Singletonify {
  private readonly map = new WeakMap<Class, Class>();

  singletonify<T extends Class>(target: T, options?: SingletonifyOptions): T {
    let instance: any;
    const proxied = new ProxyConstruct(target, {
      construct(cls, args) {
        if (!instance) {
          instance = new cls(...args);
        }
        return instance;
      },
    });

    if (options?.hideProtoConstructor !== false) {
      proxied.prototype.constructor = proxied;
    }
    this.map.set(proxied, target);
    return proxied;
  }

  getSingletonTarget<T extends Class>(singleton: T): T | undefined {
    return this.map.get(singleton) as T | undefined;
  }
}

const instance = new Singletonify();

/**
 * ## Usage
 * Just wrap your class with this function to create a new class that always returns the same instance
 * @param target The class to be wrapped
 * @param options Advanced options
 * - hideProtoConstructor(default: `true`) when it is **not** `false`, will set `target.prototype.constructor` to the singletonified class
 *
 * __PKG_INFO__
 */
export const singletonify = instance.singletonify.bind(instance);

/**
 * Retrieves the original class from the singletonified class
 * @param singleton The singletonified class
 * @returns `undefined` if the class is not singletonified, otherwise returns the original class
 */
export const getSingletonTarget = instance.getSingletonTarget.bind(instance);
