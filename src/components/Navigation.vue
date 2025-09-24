<template>
   <v-app-bar
    color="primary"
    prominent
  >
    <v-app-bar-nav-icon v-show="showNavigation" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <router-link class="no-link" :class="{ 'padding': !showNavigation }" to="/">
      <v-toolbar-title>Precios compra</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>

    <!-- <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-filter" variant="text"></v-btn>
    </template> -->

    <!-- <v-btn icon="mdi-dots-vertical" variant="text"></v-btn> -->
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
    >
      <v-list
        :items="items"
      ></v-list>
    </v-navigation-drawer>
</template>
<script lang="ts">
import { useAuthStore } from '@/store'
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'
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

const showNavigation = computed(() => {
  const authStore = useAuthStore()
  return authStore?.isAuthenticated || false
})

</script>
<style lang="scss" scoped>
.padding {
  padding-left: 64px;
}
</style>
