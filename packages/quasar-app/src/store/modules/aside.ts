import {NavItem} from '@/components/types/navigation'
import {FunctionModule, RootState} from '@/store'

export interface AsideState {
  items: NavItem[]
}

const module: FunctionModule<AsideState, RootState> = () => {
  return {
    namespaced: true,
    mutations: {},
    state: {
      items: [
        {
          title: 'reservations',
          icon: 'ion-bookmarks',
          to: '/main',
          items: [
            {
              title: 'all',
              icon: 'ion-infinite',
              to: '/main/all',
            },
          ],
        },
        {
          title: 'smootie',
          icon: 'ion-snow',
        },
      ],
    },
  }
}

export default module
