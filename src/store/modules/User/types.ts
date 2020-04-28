import {UserInfo as FirebaseUserInfo} from 'firebase'

export interface UserInfo extends Omit<FirebaseUserInfo, 'uid' | 'providerId'> {
  uid: string | null
  emailVerified?: boolean
}
