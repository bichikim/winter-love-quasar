import Vue from 'vue'
import routes from 'vue-auto-routing'
import VueRouter from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'

interface ExContext {
  // empty
}

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default (context: any) => {
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
