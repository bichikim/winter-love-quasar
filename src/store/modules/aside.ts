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
          title: 'Reservations',
          icon: 'ion-bookmarks',
          to: '/main',
          items: [
            {
              title: 'All',
              icon: 'ion-infinite',
              to: '/main/all',
            },
          ],
        },
        {
          title: 'Smootie',
          icon: 'ion-snow',
        },
      ],
    },
  }
}
