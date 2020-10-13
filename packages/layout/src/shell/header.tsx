import * as React from 'react'
import { Input, Row, Col } from 'antd'
import { Header as BaseHeader } from './base'
import { renderMenus } from './utils'
import { HeaderProps } from './interface'

export default function Header({
  logo,
  search = false,
  menus = [],
  beforeMenus = null,
  afterMenus = null
}: HeaderProps) {
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
