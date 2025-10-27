<template>
	<v-card class="cursor">
		<v-card-title>
			<div>
				No hay datos
			</div>
		</v-card-title>
	</v-card>
</template>

<script setup lang="ts">
</script>
<style lang="scss" scoped>
	.v-card {
		margin: 10px;
		.v-card-title {
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
