import Vue from 'vue'
import VueRouter from 'vue-router'


interface ExContext {
  // empty
}

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default (context: any) => {

  return new VueRouter({
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
      {
        path: '/',
        component: () => (import('layouts/default.vue')),
        children: [
          {
            path: '/',
            component: () => (import('pages/index.vue')),
          },
        ],
      },
    ],

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })
}
