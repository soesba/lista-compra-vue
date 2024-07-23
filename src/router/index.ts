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
    },
    {
      path: '/establecimientos',
      name: 'establecimientos',
      component: () => import('@/views/establecimientos/Establecimientos.vue')
    },
    {
      path: '/establecimiento-detalle/:id',
      name: 'establecimientoDetalle',
      component: () => import('@/views/establecimientos/EstablecimientoDetalle.vue')
    },
    {
      path: '/establecimiento-edicion/:id',
      name: 'establecimientoEdicion',
      component: () => import('@/views/establecimientos/EstablecimientoEdicion.vue')
    }
  ]
})

export default router
