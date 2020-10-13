import * as React from 'react'
import { Sider as AntdSider } from './base'
import { renderMenus } from './utils'
import { IMenu, SiderProps } from './interface'

export default function Sider({ menus = [], beforeMenus, afterMenus, style }: SiderProps) {
  return (
    <AntdSider style={style}>
      {beforeMenus}
      {renderMenus(menus)}
      {afterMenus}
    </AntdSider>
  )
}
