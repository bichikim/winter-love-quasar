import {UserInfo} from 'firebase'

export interface User extends Omit<UserInfo, 'uid' | 'providerId'> {
  uid: string | null
  emailVerified?: boolean
}
