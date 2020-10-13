import * as React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { IMenu } from './interface'

export const renderMenus = (menus: IMenu[]) => {
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
