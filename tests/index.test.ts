import { expect, describe, it } from 'vitest';
import { singletonify } from '../src/singleton-wrapper.js';

class TestClass {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
}

const Singleton = singletonify(TestClass);

describe('singletonify', () => {
  it('should always return the same instance', () => {
    const a = new Singleton(1);
    const b = new Singleton(2);
    expect(a).toBe(b);
    expect(a.value).toBe(1); // Only first argument is used
  });

  it('prototype.constructor of singleton is proxied', () => {
    expect(Singleton.prototype.constructor).toBe(Singleton);
  });

  it('prototype.constructor of target class is itself', () => {
    expect(TestClass.prototype.constructor).toBe(Singleton);
  });
});
