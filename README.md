# Singleton Pattern

🦄 Wrap your class to make it a true singleton!

> Note: Your environment must support Proxy

## Overview

`singleton-pattern` is a lightweight TypeScript/JavaScript utility that wraps a class constructor so that every `new` call returns the same instance. It uses Proxy to ensure singleton safety, and provides options for prototype handling.

## Features

- Make any class a singleton with one line
- Optionally control prototype.constructor behavior
- Retrieve the original class from a singletonified class
- Fully type-safe

## Installation

```bash
npm install singleton-pattern
# or
pnpm add singleton-pattern
```

## Usage

```typescript
import { singletonify, getSingletonTarget } from 'singleton-pattern';

class MyClass {
  value: number;
  constructor(v: number) {
    this.value = v;
  }
}

const Singleton = singletonify(MyClass);
const a = new Singleton(1);
const b = new Singleton(2);
console.log(a === b); // true
console.log(a.value); // 1

// Option: keep original prototype.constructor
const Singleton2 = singletonify(MyClass, { changeProtoConstructor: false });
console.log(Singleton2.prototype.constructor === MyClass); // true

// Retrieve original class
console.log(getSingletonTarget(Singleton)); // MyClass
```

## API

### `singletonify<T extends Class>(target: T, options?: SingletonifyOptions): T`

Wraps a class constructor so that all `new` calls return the same instance.

- `target`: The class to wrap
- `options.changeProtoConstructor` (default: `true`): If not `false`, sets `prototype.constructor` to the singletonified class. If `false`, keeps the original constructor.

### `getSingletonTarget<T extends Class>(singleton: T): T | undefined`

Returns the original class for a singletonified class, or `undefined` if not singletonified.

## License

MIT

## Author

Kasukabe Tsumugi <futami16237@gmail.com>
