type Class = new (...args: any[]) => any;

interface SingletonifyOptions {
  /**
   * Preventing the `.prototype.constructor` from being accessed
   * - default is `true`
   *   - **Only** when it is `false`, will remain the original constructor unchanged
   * - will change `Origin.prototype.constructor` to the singletonified class
   *   - this means Origin.prototype.constructor !== origin
   */
  hideProtoConstructor?: boolean;
}
