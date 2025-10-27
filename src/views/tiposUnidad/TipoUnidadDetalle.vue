<template>
	<detail-toolbar @onBack="onBack" @onEdit="setEdicion" @onDelete="runDelete" :deleteDisabled="!canDelete"/>
	<div class="form" v-if="data">
		<div class="body">
			<div class="inputGroup">
        <div class="labelFor">Nombre</div>
        <label>{{ data.nombre }}</label>
      </div>
      <div class="inputGroup">
        <div class="labelFor">Abreviatura</div>
        <label>{{ data.abreviatura }}</label>
			</div>
      <div class="inputGroup">
        <label class="labelFor">Equivalencias</label>
      </div>
      <div v-if="equivalencias?.length === 0" class="inputGroup">
        <label> No hay equivalencias </label>
      </div>
      <div v-else class="inputGroup margin-top-bottom">
        <label>1 {{data.nombre}} equivale a </label>
      </div>
      <div v-for="equivalencia in equivalencias">
        <label>{{equivalencia.factor}} {{ pluralize(equivalencia.to.nombre, equivalencia.factor) }}</label>
      </div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { computed } from 'vue'
import router from '@/router'
import DetailToolbar from '@/components/DetailToolbar.vue'
import { eventStore, modelStore } from '@/main'
import { useRoute } from 'vue-router'
import getById from '@/services/tipoUnidad/getTipoUnidadById.service'
import deleteItem from '@/services/tipoUnidad/deleteTipoUnidad.service'
import TipoUnidad from '@/services/tipoUnidad/models/TipoUnidad'
import { pluralize } from '@/utils/utils'
import Equivalencia from '@/services/equivalencia/models/Equivalencia'
import getByFrom from '@/services/equivalencia/getEquivalenciaByFrom.service'
// Computed
const canDelete = computed(() => {
	return data.borrable
})
// Data
const route = useRoute()
const data: TipoUnidad = (await getById(route.params['id'].toString())).data as TipoUnidad
const equivalencias = reactive<Equivalencia[]>(await (await(getByFrom(data.id))).data as Equivalencia[])

const setEdicion = () => {
  modelStore.setTipoUnidad(data)
	router.push(eventStore.getRoutes.edit)
}

const runDelete = () => {
	if (data.borrable) {
		deleteItem(data.id).then((response: any) => {
			if (response.respuesta === 200) {
				router.push(eventStore.getRoutes.list)
			}
		})
	}
}

const onBack = () => {
	router.push(eventStore.getRoutes.list)
}

</script><style lang="scss" scoped>
</style>
