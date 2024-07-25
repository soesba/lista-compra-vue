<template>
	<div id="bloqueEdicion">
		<div class="inputGroup">
      <label v-if="props.articulo.articulo" class="labelFor">{{ props.articulo?.articulo?.nombre }}</label>
			<v-autocomplete v-if="!props.articulo.articulo"
				label="Articulo*"
				required
        :variant="props.articulo ? 'outlined' : 'underlined'"
        :items="listaArticulos"
        item-title="nombre"
        item-value="id"
        v-model="nuevoArticulo.articulo"
        :return-object="true"
        @update:modelValue="onArticuloUpdate"
			></v-autocomplete>
      <div class="wrapper-icons" v-if="props.articulo.articulo">
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="red"
          @click="onClickDelete"
        ></v-btn>
      </div>
      <div class="wrapper-icons" v-else="!props.articulo.articulo">
        <v-btn
          icon="mdi-check"
          variant="text"
          color="primary"
          :disabled="!canSave"
          @click="onClickSave"
        ></v-btn>
        <v-btn icon="mdi-close" variant="text" color="primary" @click="onClickCancel"></v-btn>
      </div>
		</div>
		<div class="inputGroup">
			<v-text-field
				type="number"
				label="Cantidad"
        :variant="props.articulo ? 'outlined' : 'underlined'"
        v-model="nuevoArticulo.cantidad"
				:hide-spin-buttons="true"
				max-width="100"
			></v-text-field>
			<v-text-field
        type="number"
        label="Precio unitario*"
        :variant="props.articulo ? 'outlined' : 'underlined'"
        v-model="nuevoArticulo.precioUnitario"
				:hide-spin-buttons="true"
				max-width="100"
      ></v-text-field>
      <v-text-field
        label="Total"
        readonly
        :variant="props.articulo ? 'outlined' : 'underlined'"
        :model-value="getTotal()"
				:hide-spin-buttons="true"
				max-width="100"
      ></v-text-field>
		</div>
    <div v-if="nuevoArticulo.articulo">
      <div class="inputGroup">
        <label class="labelFor">Unidades de medida</label>
      </div>
      <div class="inputGroup">
        <v-text-field v-for="unidad in nuevoArticulo.unidadesMedida"
            type="number"
            class="text-capitalize"
            :label="pluralize(unidad.nombre)"
            :variant="props.articulo ? 'outlined' : 'underlined'"
            :hide-spin-buttons="true"
            v-model="unidad.valor"
            max-width="100"
          ></v-text-field>
      </div>
    </div>
	</div>
</template>
<script lang="ts">
	import useVuelidate from '@vuelidate/core'
	import { required } from 'vuelidate/lib/validators'
	import type { PropType } from 'vue'
	import { computed, defineComponent, ref } from 'vue'
  import get from '@/services/articulo/getArticulo.service'
  import type ArticuloCompra from '@/services/compra/models/ArticuloCompra'
	export default defineComponent({
		name: 'ArticulosCompra',
	})
</script>
<script setup lang="ts">
	const emitter = defineEmits(['saveArticulo', 'updateArticulo'])
	const props = defineProps({
		articulo: {
			type: Object as PropType<ArticuloCompra>,
			default: {},
		},
	})

	const nuevoArticulo = props.articulo ? ref({ ...props.articulo }) : ref({
    articulo: null,
    cantidad: null,
    precioUnitario: null,
    unidadesMedida: new Array()
  })

	// Computed
	const canSave = computed(() => {
		return !v$.value.$invalid
	})

  

	// Validations
	const validations = computed(() => {
		return {
			nuevoArticulo: {
				articulo: { required },
        cantidad: { required },
        precioUnitario: { required }
			},
		}
	})
	const v$ = useVuelidate(validations, { nuevoArticulo: nuevoArticulo })
  const listaArticulos = (await get()).data
	// Methods	
  const getTotal = () => {
    if (nuevoArticulo.value.cantidad && nuevoArticulo.value.precioUnitario) {
      return nuevoArticulo.value.cantidad * nuevoArticulo.value.precioUnitario
    }
    return null
  }

  const pluralize = (value: string) => {
    if (value === 'unidad') {
      return 'unidades'
    }
    const vocales = ['u', 'e', 'o', 'a', 'i'];
    const ultimoCaracter = value.charAt(value.length - 1)    
    if (vocales.includes(ultimoCaracter)) {
      return value.concat('s')
    }
    return value.concat('as')
  }

  const onArticuloUpdate = (evt: any) => {
    nuevoArticulo.value.unidadesMedida = new Array()
    nuevoArticulo.value.articulo?.tiposUnidad.forEach(element => {
      const { id, nombre } = {...element}
      nuevoArticulo.value.unidadesMedida.push({id: id, nombre: nombre, valor: null})
    })
  }

	const onClickSave = () => {
		emitter('saveArticulo', nuevoArticulo.value)
		resetForm()
	}

	const onClickCancel = () => {
		resetForm()
	}

  const onClickDelete = () => {

  }

	const resetForm = () => {
		nuevoArticulo.value = {
      articulo: null,
      cantidad: null,
      precioUnitario: null,
      unidadesMedida: new Array()
		}
    v$.value.$reset()
	}
</script>
<style lang="scss" scoped>
	#bloqueEdicion {
		display: flex;
    flex-direction: column;
		justify-content: center;
	}
</style>
