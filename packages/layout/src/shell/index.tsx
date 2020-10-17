import * as React from 'react'
import { ConfigProvider, Shell, Nav } from '@alifd/next'
import { renderMenus } from './utils'
import { ShellProps } from './interface'

import './global.css'
import style from './index.module.css'

export default function Layout({
  children,
  logo,
  headerMenus = [],
  siderMenus = [],
  footer,
  siderExtra,
  headerExtra,
  hasHeader,
  hasSider
}: ShellProps) {
  const renderHeaderMenus = () => {
    if (headerMenus) {
      return (
        <Nav direction="hoz" embeddable>
          {renderMenus(headerMenus)}
        </Nav>
      )
    }

    return null
  }

  const renderSiderMenus = () => {
    if (siderMenus) {
      return <Nav embeddable>{renderMenus(siderMenus)}</Nav>
    }

    return null
  }

  const renderHeader = () => {
    if (hasHeader) {
      return (
        <>
          {logo && <Shell.Branding>{logo}</Shell.Branding>}
          <Shell.Action>
            {headerExtra?.beforeMenus}
            {renderHeaderMenus()}
            {headerExtra?.afterMenus}
          </Shell.Action>
        </>
      )
    }

    return null
  }

  const renderSider = () => {
    if (hasSider) {
      return (
        <Shell.Navigation trigger={null}>
          {siderExtra?.beforeMenus}
          {renderSiderMenus()}
          {siderExtra?.afterMenus}
        </Shell.Navigation>
      )
    }

    return null
  }

  const renderFooter = () => {
    if (footer) {
      return <Shell.Footer>{footer}</Shell.Footer>
    }

    return null
  }

  return (
    <ConfigProvider prefix="vp-theme-">
      <Shell className={style.layout}>
        {renderHeader()}
        {renderSider()}
        <Shell.Content className={style.content}>
          <ConfigProvider prefix="next-">{children}</ConfigProvider>
        </Shell.Content>
        {renderFooter()}
      </Shell>
    </ConfigProvider>
  )
}
