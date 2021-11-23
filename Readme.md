## Advocacy for @typescript-eslint/no-relative-parent-imports

### Intro

In javascript projects, I love to use the eslint rule
`imports/relative-parent-imports` to force all the code to use dependency injection.

It's works well for JavaScript project

But in typescript we need types introduced by the dependencies to specify 
constructor parameters types for dependency injection.

To illustrate the problem, run `npm install` and `npm run lint` in this project.

### Example

In this project, we have several components.

```
src/
├── dependency                          Low level dependency
│         ├── dependency.ts             Types defining the contract
│         ├── lame-dependency.ts        Implementation
│         └── terrific-dependency.ts    Alternative implementation
├── main
│         └── main.ts                   High level component requiring the dependency
└── entrypoint.ts
```

Here are the types defining the contract.

```typescript
// dependency/dependency.ts

export interface Dependency {
    sayHelloDependency(): void
}
```

Here is the first implementation

```typescript
// dependency/lame-dependency.ts

import { Dependency } from './dependency'

export class LameDependency implements Dependency {
  sayHelloDependency (): void {
    console.log(`Hello, I'm a lame implementation of Dependency`)
  }
}
```

Here is an alternative implementation

```typescript
// dependency/terrific-dependency.ts

import { Dependency } from './dependency'

export class TerrificDependency implements Dependency {
  sayHelloDependency (): void {
    console.log(`Hello, I'm a terrific implementation of Dependency`)
  }
}
```

```typescript
// main/main.ts

import { Dependency } from '../dependency/dependency'

export class Main {
  private readonly dependency: Dependency

  constructor (dependency: Dependency) {
    this.dependency = dependency
  }

  doTheWork () {
    this.dependency.sayHelloDependency()
  }
}
```

```typescript
// entrypoint.ts

import { TerrificDependency } from './dependency/terrific-dependency'
import { Main } from './main/main'

const dependency = new TerrificDependency() // of course

const main = new Main(dependency)

main.doTheWork()
```

### Current behavior

In this project if we use `imports/relative-parent-imports`, we end up with an
error when `main.ts` imports the interface specifying the dependency from `../dependency/dependency.ts`.

### Requested feature

I would like to be able to write this :

```json
{
  "rules": {
    "@typescript-eslint/no-relative-parent-imports": [
      "error",
      {
        "allowTypeImports": true
      }
    ]
  }
}
```

This would prevent importing values from parent directories, but allow types.
