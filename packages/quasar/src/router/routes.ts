import {RouteConfig} from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import(/* webpackMode: "eager" */ 'layouts/MainLayout/Index.vue'),
    children: [
      {path: '', component: () => import(/* webpackMode: "eager" */ 'pages/Index.vue')},
      {path: '/history', component: () => import('pages/History/Index.vue')},
      {path: '/cart', component: () => import('pages/Cart/Index.vue')},
      {path: '/sign', component: () => import('pages/Sign/Index.vue')},
    ],
  },
]

// Always leave this as last one
if(process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
