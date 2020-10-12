import * as reactPlugin from 'vite-plugin-react'
import mdx from '@snake/vite-plugin-mdx'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  jsx: 'react',
  plugins: [mdx(), reactPlugin]
}

export default config
