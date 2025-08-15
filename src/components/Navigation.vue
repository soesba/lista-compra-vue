<template>
   <div class="navigation-component">
    <div class="nav-icon">
      <Button rounded icon="pi pi-bars" class="button-drawer" @click="drawer = true" />
    </div>
    <div class="nav-title">
      <router-link class="no-link title" to="/">
        Precios compra
      </router-link>
    </div>
    <div class="nav-others"></div>
  </div>
  <drawer-component
      :visible="drawer"
      :items="items"
      @update:visible="drawer = $event"
    />
</template>
<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import Button from 'primevue/button'
import DrawerComponent from './DrawerComponent.vue'
export default defineComponent({
	name: 'NavigationComponent'
})
</script>
<script setup lang="ts">

const drawer = ref(false)
const items = ref([
	{
		title: 'Articulos',
		props: {
			to: '/articulos',
			link: true
		}
	},
	{
		title: 'Tipo de unidades',
		props: {
			to: '/tiposUnidades',
			link: true
		}
	},
	{
		title: 'Categorías de establecimientos',
		props: {
			to: '/tiposEstablecimientos',
			link: true
		}
	},
	{
		title: 'Establecimientos',
		props: {
			to: '/establecimientos',
			link: true
		}
	},
	{
		title: 'Precios',
		props: {
			to: '/precios',
			link: true
		}
	}
])

</script>

<style lang="scss" scoped>
.navigation-component {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0.5rem;
  background-color: var(--p-primary-color);
  color: white;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }

}
</style>