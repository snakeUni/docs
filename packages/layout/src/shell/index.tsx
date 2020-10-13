import * as React from 'react'
import { Layout, Footer, Content } from './base'
import Header from './header'
import Sider from './sider'
import { ShellProps } from './interface'

export default function Shell({ children }: ShellProps) {
  return (
    <Layout>
      <Header />
      <Layout>
        <Sider />
        <Layout>
          <Content>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  )
}
