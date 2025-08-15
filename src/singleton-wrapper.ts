/**
 * ## Usage
 *
 * __PKG_INFO__
 */
export function singletonify<T extends Class>(targetClass: T): T {
  let instance: any;
  const proxied = new Proxy(targetClass, {
    construct(cls, args) {
      if (!instance) {
        instance = new cls(...args);
      }
      return instance;
    },
  });

  proxied.prototype.constructor = proxied;

  return proxied;
}
