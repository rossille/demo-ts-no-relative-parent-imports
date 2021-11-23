import { TerrificDependency } from './dependency/terrific-dependency'
import { Main } from './main/main'

const dependency = new TerrificDependency() // of course

const main = new Main(dependency)

main.doTheWork()
