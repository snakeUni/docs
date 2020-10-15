import * as React from 'react'
import Shell from './shell'
import { MDX } from './codeBlock'
import { IMenu } from './shell/interface'
import { CreateThemeParam, ITheme, IPagesStaticData } from './type'

export function createTheme({
  siderExtra,
  siderMenus,
  headerExtra,
  headerMenus,
  logo,
  footer
}: CreateThemeParam): ITheme {
  const Theme: ITheme = ({ staticData, loadState, loadedData }) => {
    const newSiderMenus = React.useMemo(() => {
      return siderMenus ?? defaultMenu(staticData)
    }, [siderMenus, staticData])

    if (loadState.type === 'loading') {
      return (
        <Shell
          siderMenus={newSiderMenus}
          siderExtra={siderExtra}
          logo={logo}
          footer={footer}
          headerExtra={headerExtra}
          headerMenus={headerMenus}
        >
          <p>initial Loading...</p>
        </Shell>
      )
    }

    if (loadState.type === 'load-error') {
      return (
        <Shell
          siderMenus={newSiderMenus}
          siderExtra={siderExtra}
          logo={logo}
          footer={footer}
          headerExtra={headerExtra}
          headerMenus={headerMenus}
        >
          <p>Load error</p>
        </Shell>
      )
    }

    if (loadState.type === '404') {
      const Com404 = loadedData['/404']?.main?.default
      return (
        <Shell
          siderMenus={newSiderMenus}
          siderExtra={siderExtra}
          logo={logo}
          footer={footer}
          headerExtra={headerExtra}
          headerMenus={headerMenus}
        >
          {Com404 ? <Com404 /> : <p>Page not found.</p>}
        </Shell>
      )
    }

    if (loadState.type !== 'loaded') {
      return <p>Unknown load loadState: {loadState.type}</p>
    }

    const pageData = loadedData[loadState.routePath]
    const pageStaticData = staticData[loadState.routePath]
    const isComposedPage = Object.keys(pageData).length > 1

    return (
      <Shell
        siderMenus={newSiderMenus}
        siderExtra={siderExtra}
        logo={logo}
        footer={footer}
        headerExtra={headerExtra}
        headerMenus={headerMenus}
      >
        {Object.entries(pageData).map(([key, dataPart], idx) => {
          const ContentComp = (dataPart as any).default
          const pageStaticDataPart = pageStaticData[key]
          const isMD = pageStaticDataPart.sourceType === 'md'
        })}
      </Shell>
    )
  }

  return Theme
}

export function defaultMenu(pages: IPagesStaticData): IMenu[] {
  return Object.entries<any>(pages)
    .filter(([path]) => path !== '/404')
    .filter(([path, staticData]) => !staticData.hideInMenu)
    .sort((a, b) => {
      const [pathA, staticDataA] = a
      const [pathB, staticDataB] = b

      let ASort: number
      let BSort: number
      if (staticDataA.sort !== undefined) ASort = Number(staticDataA.sort)
      else if (staticDataA.main?.sort !== undefined) ASort = Number(staticDataA.main.sort)
      else ASort = 1
      if (staticDataB.sort !== undefined) BSort = Number(staticDataB.sort)
      else if (staticDataB.main?.sort !== undefined) BSort = Number(staticDataB.main.sort)
      else BSort = 1

      if (ASort !== BSort) return ASort - BSort
      return pathA.localeCompare(pathB)
    })
    .map(([path, staticData]) => {
      return {
        path,
        text: staticData.title ?? staticData.main?.title ?? path
      }
    })
}
