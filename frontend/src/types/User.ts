export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

export {
  Credentials,
  LoginUser,
  User,
  UserState,
  UpdateUserAction,
  SetUserAction,
  Owner
}


type Credentials = {
  username: string
  password: string
  fullname: string
}

type LoginUser = {
  _id: string
  username?: string
}

interface User {
  _id: string
  fullname: string
  imgUrl: string
  level: number
  rate: number
  reviews: any[]
}
interface UserState {
  user: User | null
  users: User[]
}

interface SetUserAction {
  type: typeof SET_USER
  user: User
}

interface UpdateUserAction {
  type: typeof UPDATE_USER
  user: User
}

interface Owner {
  _id: string
  fullname: string
  imgUrl: string
  level?: string
  rate?: number
  reviews?: any[]
}

