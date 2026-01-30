<template>
	<v-card>
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
		margin: auto;
    width: 90%;
    max-width: 90%;
    text-align: center;
		.v-card-title {
      color: rgb(var(--v-theme-primary));
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
