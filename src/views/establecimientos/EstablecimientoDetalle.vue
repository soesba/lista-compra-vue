<template>
  <detalle-toolbar>
    <template v-slot:left>
      <v-btn icon="mdi-arrow-left" @click="onBack" variant="text" color="primary"></v-btn>
    </template>
    <template v-slot:right>
      <v-btn icon="mdi-pencil" variant="text" color="primary" @click="setEdicion()"></v-btn>
    </template>
  </detalle-toolbar>
  <div class="form">
    <div class="header">
      <v-img class="logo" :src="noLogoUrl"></v-img>
      <label class="text-h6">{{  editData.nombre }}</label>
    </div>
    <div class="body">
      <div class="inputGroup">
					<label class="labelFor">Categoría</label>
          <label>{{ editData.tipoEstablecimiento.nombre }}</label>
			</div>
      <div class="inputGroup">
					<label class="labelFor">Direcciones</label>
        <label v-if="!mostrarDirecciones">
            No hay direcciones
        </label>  
			</div>
      
    </div>
  </div>
</template>

<script lang="ts">
	import { defineComponent, onMounted, reactive } from 'vue'
	import { computed } from 'vue'
  import router from '@/router'
	export default defineComponent({
		name: 'EstablecimientoDetalle',
	})
</script>
<script setup lang="ts">
  import DetalleToolbar from '@/components/DetalleToolbar.vue' 
	import type Establecimiento from '@/services/establecimiento/models/Establecimiento'
  import type { PropType } from 'vue'
	import { modelStore, noLogoUrl} from '@/main'
  
		// Props
	const props = defineProps({
    data: {
      type: Object as PropType<Establecimiento>,
			default: modelStore.establecimiento
    },
		adding: {
			type: Boolean,
			default: false
		}
  })
  // Computed 
  const mostrarDirecciones = computed(() => {
    return editData.direcciones.length !== 0
  })
	// Data
	let editData = reactive<any>({ ...props.data })

	// Methods	
  const onBack = () => {
    router.push('/establecimientos')
  }

  const setEdicion = () => {
    router.replace('/establecimiento-edicion')
  }
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 150px;
}
</style>
