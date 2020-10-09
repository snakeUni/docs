import { Plugin } from 'vite'
import { transformMdx } from './transform'

export default function createPlugin(): Plugin {
  return {
    transforms: [transformMdx]
  }
}
