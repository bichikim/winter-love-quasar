export interface NavAct {
  name: string
  payload?: string[]
  refresh?: boolean
}

export interface NavTo {
  action?: NavAct
  path?: string
  name?: string
  params?: { [key: string]: any }
  query?: { [key: string]: any }
}

export interface NavItem {
  title: string
  // translate title by the i18n
  titleTranslation?: boolean
  icon: string
  to?: string | NavTo
  items?: NavItem[]
}
