import {NavItem} from '@/components/types/navigation'
import {State} from '@/store'
import Vue from 'vue'
import {Module} from 'vuex'

export interface AsideState {
  items: NavItem[]
}

export default <V extends Vue>(
  contex: any,
): Module<AsideState, State> => {
  return {
    namespaced: true,
    mutations: {

    },
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
