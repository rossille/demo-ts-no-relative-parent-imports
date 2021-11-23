import { Dependency } from './dependency'

export class TerrificDependency implements Dependency {
  sayHelloDependency (): void {
    console.log(`Hello, I'm a terrific implementation of Dependency`)
  }
}
