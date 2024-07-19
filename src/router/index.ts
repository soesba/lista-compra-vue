import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tiposUnidades',
      name: 'tiposUnidades',
      component: () => import('@/views/TiposUnidades.vue')
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: () => import('@/views/Articulos.vue')
    },
    {
      path: '/tiposEstablecimientos',
      name: 'tiposEstablecimientos',
      component: () => import('@/views/TiposEstablecimientos.vue')
    }
  ]
})

export default router
