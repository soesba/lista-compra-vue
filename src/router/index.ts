import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuth } from './validations/AuthGuard'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
     {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
		{
			path: '/',
			name: 'home',
			component: HomeView,
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/tiposUnidades',
			name: 'tiposUnidades',
			component: () => import('@/views/tiposUnidad/TipoUnidades.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/tiposUnidades-edicion',
			name: 'tiposUnidades-edicion',
			component: () => import('@/views/tiposUnidad/TipoUnidadEdicion.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
    {
			path: '/tiposUnidades-detalle/:id',
			name: 'tiposUnidades-detalle',
			component: () => import('@/views/tiposUnidad/TipoUnidadDetalle.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/articulos',
			name: 'articulos',
			component: () => import('@/views/articulos/Articulos.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/articulo-detalle/:id',
			name: 'articuloDetalle',
			component: () => import('@/views/articulos/ArticuloDetalle.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
    {
			path: '/articulo-edicion',
			name: 'articuloEdicion',
			component: () => import('@/views/articulos/ArticuloEdicion.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/tiposEstablecimientos',
			name: 'tiposEstablecimientos',
			component: () => import('@/views/tiposEstablecimientos/TiposEstablecimientos.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
    {
      path: '/tipoEstablecimiento-detalle/:id',
      name: 'tipoEstablecimiento-detalle',
      component: () => import('@/views/tiposEstablecimientos/TipoEstablecimientoDetalle.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
    },
    {
      path: '/tipoEstablecimiento-edicion',
      name: 'tipoEstablecimiento-edicion',
      component: () => import('@/views/tiposEstablecimientos/TipoEstablecimientoEdicion.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
    },
		{
			path: '/establecimientos',
			name: 'establecimientos',
			component: () => import('@/views/establecimientos/Establecimientos.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/establecimiento-detalle/:id',
			name: 'establecimientoDetalle',
			component: () => import('@/views/establecimientos/EstablecimientoDetalle.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/establecimiento-edicion',
			name: 'establecimientoEdicion',
			component: () => import('@/views/establecimientos/EstablecimientoEdicion.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/precios',
			name: 'precios',
			component: () => import('@/views/precios/Precios.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/precio-edicion',
			name: 'precioEdicion',
			component: () => import('@/views/precios/PrecioEdicion.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
		{
			path: '/precio-detalle/:id?',
			name: 'precioDetalle',
			component: () => import('@/views/precios/PrecioDetalle.vue'),
			beforeEnter: (to, from, next) => { isAuth(to, from, next) }
		},
    {
      path: '/acercaDe',
      name: 'acercaDe',
      component: () => import('@/views/AcercaDeView.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      beforeEnter: (to, from, next) => { isAuth(to, from, next) }
    }
	]
})

export default router
