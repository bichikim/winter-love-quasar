import {RouteConfig} from 'vue-router'


const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/history', component: () => import('pages/History.vue')},
      {path: '/smoothie', component: () => import('pages/Smoothie.vue')},
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
