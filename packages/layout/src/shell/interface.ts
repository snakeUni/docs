export interface Extra {
  /**
   * 菜单的前置区域
   */
  beforeMenus?: React.ReactNode
  /**
   * 菜单的后置区域
   */
  afterMenus?: React.ReactNode
}

export interface HeaderProps extends Extra {
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
}

export interface SiderProps extends Extra {
  /**
   * 侧边栏
   */
  menus?: IMenu[]
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
  headerMenus?: IMenu[]
  siderMenus?: IMenu[]
  logo?: React.ReactNode
  footer?: React.ReactNode
  headerExtra?: Extra
  siderExtra?: Extra
}
