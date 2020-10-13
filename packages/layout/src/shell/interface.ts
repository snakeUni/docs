export interface HeaderProps {
  /**
   * logo 区域
   */
  logo?: React.ReactNode
  /**
   * 是否展示搜索
   */
  search?: boolean
  /**
   * 菜单
   */
  menus?: IMenu[]
  /**
   * 菜单的前置区域
   */
  beforeMenus?: React.ReactNode
  /**
   * 菜单的后置区域
   */
  afterMenus?: React.ReactNode
}

export interface SiderProps {
  /**
   * 侧边栏
   */
  menus?: IMenu[]
  /**
   * 菜单的前置区域
   */
  beforeMenus?: React.ReactNode
  /**
   * 菜单的后置区域
   */
  afterMenus?: React.ReactNode
  /**
   * 样式
   */
  style?: React.CSSProperties
}

export type IMenu =
  | {
      text: string
      /**
       * 外链
       */
      href: string
    }
  | {
      text: string
      /**
       * 路径 /a/b
       */
      path: string
    }
  | {
      text: string
      group: string
      /**
       * 分组
       */
      children: IMenu[]
    }

export interface ShellProps {
  children?: React.ReactNode
}
