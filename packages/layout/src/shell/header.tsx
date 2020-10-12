import * as React from 'react'
import { Link } from 'react-router-dom'
import { Input, Row, Col, Menu } from 'antd'
import { Header as BaseHeader } from './base'
import { HeaderProps, IMenu } from './interface'

export default function Header({
  logo,
  search = false,
  menus = [],
  beforeMenus = null,
  afterMenus = null
}: HeaderProps) {
  const renderMenus = (menus: IMenu[]) => {
    const menuNodes = menus.map((m, index) => {
      if ('path' in m) {
        return (
          <Menu.Item key={index}>
            <Link to={m.path}>{m.text}</Link>
          </Menu.Item>
        )
      }

      if ('href' in m) {
        return (
          <Menu.Item key={index}>
            <a href={m.href} target="_blank" />
          </Menu.Item>
        )
      }

      if ('group' in m) {
        const children = m.children
        return (
          <div className="vite-layout-group">
            <div className="vite-layout-group-title">{m.text}</div>
            {renderMenus(children)}
          </div>
        )
      }
    })

    if (menuNodes.length) {
      return <Menu>{menuNodes}</Menu>
    }

    return null
  }
  return (
    <BaseHeader id="header" className="clearfix">
      <Row style={{ height: 64, flexFlow: 'nowrap' }}>
        <Col xs={24} sm={24} md={6} lg={6} xl={5} xxl={4}>
          {logo}
        </Col>
        <Col xs={0} sm={0} md={18} lg={18} xl={19} xxl={20} style={{ display: 'flex' }}>
          {search && (
            <div>
              <Input />
            </div>
          )}
          {beforeMenus}
          {renderMenus(menus)}
          {afterMenus}
        </Col>
      </Row>
    </BaseHeader>
  )
}
