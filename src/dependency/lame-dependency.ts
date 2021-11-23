import { Dependency } from './dependency'

export class LameDependency implements Dependency {
  sayHelloDependency (): void {
    console.log(`Hello, I'm a lame implementation of Dependency`)
  }
}
