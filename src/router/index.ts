import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'vue-auto-routing'
import {Store} from 'vuex'
import {createRouterLayout} from 'vue-router-layout'
import middleware, {Context} from '@/lib/middleware'
import {State} from '@/store/types'

interface ExContext {
  // empty
}

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(context: any) {
  const routerLayout = createRouterLayout((layout) => {
    return import(`${process.env.WEBPACK_SRC_ALIAS}/${process.env.VUE_LAYOUTS_PATH}/${layout}.vue`)
  })


  return  new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
      {
        path: '/',
        component: routerLayout,
        children: routes,
      },
    ],

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
}
