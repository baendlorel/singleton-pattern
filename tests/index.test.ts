import { expect, describe, it } from 'vitest';
import { singletonify } from '../src/singleton-wrapper.js';

class TestClass {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
}

const SingletonTestClass = singletonify(TestClass);

describe('singletonify', () => {
  it('should always return the same instance', () => {
    const a = new SingletonTestClass(1);
    const b = new SingletonTestClass(2);
    expect(a).toBe(b);
    expect(a.value).toBe(1); // Only first argument is used
  });

  it('prototype.constructor of singleton is proxied', () => {
    expect(SingletonTestClass.prototype.constructor).toBe(SingletonTestClass);
  });

  it('prototype.constructor of target class is itself', () => {
    expect(TestClass.prototype.constructor).toBe(TestClass);
  });
});
