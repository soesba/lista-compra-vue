<template>
	<Card class="card cursor">
    <template #title>
      <div class="card-title">
        <div>
          No hay datos
        </div>
      </div>
    </template>
	</Card>
</template>

<script lang="ts">
import Card from 'primevue/card';
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'EmptyCard',
})
</script>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
	.p-card {
		margin: 10px;
		.p-card-title {
			display: flex;
			flex-direction: row;
			div:first-of-type {
				flex: 2;
			}
		}

		.wrapper-icons {
			display: flex;
			flex-direction: column;
		}
	}
</style>
