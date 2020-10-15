import * as React from 'react'
import { Layout, Footer, Content } from './base'
import Header from './header'
import Sider from './sider'
import { ShellProps } from './interface'

export default function Shell({
  children,
  logo,
  headerMenus,
  siderMenus,
  footer,
  siderExtra,
  headerExtra
}: ShellProps) {
  return (
    <Layout>
      <Header logo={logo} menus={headerMenus} {...headerExtra} />
      <Layout>
        <Sider menus={siderMenus} {...siderExtra} />
        <Layout>
          <Content>{children}</Content>
          {footer && <Footer>{footer}</Footer>}
        </Layout>
      </Layout>
    </Layout>
  )
}
