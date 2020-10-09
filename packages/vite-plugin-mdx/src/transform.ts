import { Transform } from 'vite'
import { startService, Service } from 'esbuild'
import { reactRefreshTransform } from 'vite-plugin-react/dist/transform'
import mdx from '@mdx-js/mdx'

const DEFAULT_RENDERER = `
import React from 'react'
import { mdx } from '@mdx-js/react'
`

let service: Service | undefined
async function ensureEsbuildService() {
  if (!service) {
    service = await startService()
  }

  return service
}

export const transformMdx: Transform = {
  test: ({ path }) => {
    if (/\.mdx?$/.test(path)) {
      return true
    }

    return false
  },
  transform: async ({ code, path, isBuild }) => {
    // https://github.com/vitejs/vite-plugin-react/blob/master/src/transform.ts
    let HMR = true

    if (isBuild || process.env.NODE_ENV === 'production' || path.startsWith(`/@modules/`)) {
      HMR = false
    }

    const jsx = await mdx(code)
    const esbuild = await ensureEsbuildService()
    // https://github.com/evanw/esbuild/blob/master/docs/js-api.md
    const { js } = await esbuild.transform(jsx, {
      loader: 'jsx',
      target: 'es2019',
      jsxFactory: 'mdx'
    })

    const withoutHMR = `${DEFAULT_RENDERER}\n${js}`

    if (!HMR) {
      return withoutHMR
    }

    const withHMR = reactRefreshTransform.transform({
      code: withoutHMR,
      path
    } as any)

    return withHMR
  }
}
