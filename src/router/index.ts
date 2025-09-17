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
			component: () => import('@/views/tiposUnidad/TipoUnidades.vue')
		},
		{
			path: '/tiposUnidades-edicion',
			name: 'tiposUnidades-edicion',
			component: () => import('@/views/tiposUnidad/TipoUnidadEdicion.vue')
		},
    {
			path: '/tiposUnidades-detalle/:id',
			name: 'tiposUnidades-detalle',
			component: () => import('@/views/tiposUnidad/TipoUnidadDetalle.vue'),
      props: true
		},
		{
			path: '/articulos',
			name: 'articulos',
			component: () => import('@/views/articulos/Articulos.vue')
		},
		{
			path: '/articulo-detalle/:id',
			name: 'articuloDetalle',
			component: () => import('@/views/articulos/ArticuloDetalle.vue'),
      props: true
		},
    {
			path: '/articulo-edicion',
			name: 'articuloEdicion',
			component: () => import('@/views/articulos/ArticuloEdicion.vue')
		},
		{
			path: '/tiposEstablecimientos',
			name: 'tiposEstablecimientos',
			component: () => import('@/views/tiposEstablecimientos/TiposEstablecimientos.vue')
		},
    {
      path: '/tipoEstablecimiento-detalle/:id',
      name: 'tipoEstablecimiento-detalle',
      component: () => import('@/views/tiposEstablecimientos/TipoEstablecimientoDetalle.vue'),
      props: true
    },
    {
      path: '/tipoEstablecimiento-edicion',
      name: 'tipoEstablecimiento-edicion',
      component: () => import('@/views/tiposEstablecimientos/TipoEstablecimientoEdicion.vue')
    },
		{
			path: '/establecimientos',
			name: 'establecimientos',
			component: () => import('@/views/establecimientos/Establecimientos.vue')
		},
		{
			path: '/establecimiento-detalle/:id',
			name: 'establecimientoDetalle',
			component: () => import('@/views/establecimientos/EstablecimientoDetalle.vue'),
      props: true
		},
		{
			path: '/establecimiento-edicion',
			name: 'establecimientoEdicion',
			component: () => import('@/views/establecimientos/EstablecimientoEdicion.vue')
		},
		{
			path: '/precios',
			name: 'precios',
			component: () => import('@/views/precios/Precios.vue')
		},
		{
			path: '/precio-edicion',
			name: 'precioEdicion',
			component: () => import('@/views/precios/PrecioEdicion.vue')
		},
		{
			path: '/precio-detalle/:id?',
			name: 'precioDetalle',
			component: () => import('@/views/precios/PrecioDetalle.vue'),
      props: true
		}
	]
})

export default router
