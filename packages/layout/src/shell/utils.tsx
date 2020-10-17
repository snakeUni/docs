import * as React from 'react'
import { Nav } from '@alifd/next'
import { Link } from 'react-router-dom'
import { IMenu } from './interface'

export const renderMenus = (menus: IMenu[]) => {
  const menuNodes = menus.map((m, index) => {
    if ('path' in m) {
      return (
        <Nav.Item key={index}>
          <Link to={m.path}>{m.text}</Link>
        </Nav.Item>
      )
    }

    if ('href' in m) {
      return (
        <Nav.Item key={index}>
          <a href={m.href} target="_blank" />
        </Nav.Item>
      )
    }

    if ('group' in m) {
      return (
        <Nav.Group label={m.group} key={index}>
          {renderMenus(m.children)}
        </Nav.Group>
      )
    }
  })

  if (menuNodes.length) {
    return menuNodes
  }

  return null
}
