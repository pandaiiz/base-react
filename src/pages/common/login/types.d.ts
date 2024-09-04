type LoginDto = {
  username: string
  password: string
}

type Token = {
  token: string
}
type UserInfo = {
  avatar: string
  nickname: string
  phone: string
  remark: string
  username: string
}

type MenuItem = {
  meta: MenuMeta
  id: number
  path: string
  name: string
  component: string
}

type MenuMeta = {
  title: string
  permission?: string
  type?: number
  icon?: string
  sort?: number
  component?: string
  show?: number
  activeMenu?: string
  status?: number
}
