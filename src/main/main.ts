import type { Dependency } from '../dependency/dependency'

export class Main {
  private readonly dependency: Dependency

  constructor (dependency: Dependency) {
    this.dependency = dependency
  }

  doTheWork () {
    this.dependency.sayHelloDependency()
  }
}
