import { expect, describe, it } from 'vitest';
import { singletonify, getSingletonTarget } from '../src/singleton-wrapper.js';

describe('singletonify', () => {
  it('should always return the same instance', () => {
    class TestClass {
      value: number;
      constructor(v: number) {
        this.value = v;
      }
    }
    const Singleton = singletonify(TestClass);
    const a = new Singleton(1);
    const b = new Singleton(2);
    expect(a).toBe(b);
    expect(a.value).toBe(1);
  });

  it('prototype.constructor of singleton is proxied by default', () => {
    class TestClass {}
    const Singleton = singletonify(TestClass);

    expect(Singleton.prototype.constructor).toBe(Singleton);
  });

  it('prototype.constructor of target class is itself', () => {
    class TestClass {}

    expect(TestClass.prototype.constructor).toBe(TestClass);
  });

  it('can keep original prototype.constructor if option is set', () => {
    class TestClass {}
    const Singleton = singletonify(TestClass, { changeProtoConstructor: false });

    expect(Singleton.prototype.constructor).toBe(TestClass);
  });

  it('getSingletonTarget returns original class', () => {
    class TestClass {}
    const Singleton = singletonify(TestClass);

    expect(getSingletonTarget(Singleton)).toBe(TestClass);
    expect(getSingletonTarget(TestClass)).toBeUndefined();
  });
});
