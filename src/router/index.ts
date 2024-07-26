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
      component: () => import('@/views/articulos/Articulos.vue')
    },
    {
      path: '/articulo-detalle/:id',
      name: 'articuloDetalle',
      component: () => import('@/views/articulos/ArticuloDetalle.vue')
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
      path: '/establecimiento-edicion/:id?',
      name: 'establecimientoEdicion',
      component: () => import('@/views/establecimientos/EstablecimientoEdicion.vue')
    },
    {
      path: '/precios',
      name: 'precios',
      component: () => import('@/views/precios/Precios.vue')
    },
    {
      path: '/precio-edicion/:id?',
      name: 'precioEdicion',
      component: () => import('@/views/precios/PrecioEdicion.vue')
    },
    {
      path: '/precio-detalle/:id?',
      name: 'precioDetalle',
      component: () => import('@/views/precios/PrecioDetalle.vue')
    }
  ]
})

export default router
