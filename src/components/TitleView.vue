<template>
	<div class="title-container">
		<label>{{ titulo }}</label>
		<v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in menu"
            :key="i" :value="i" @click="handleClick(i)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
	</div>
</template>
<script setup lang="ts">
  interface itemMenu {
    title: string,
    click: Function
  }

  const props = defineProps({
    titulo: String,
    menu: {
      type: Array<itemMenu>,
      required: true
    }
  })

  const emit = defineEmits(['menu-click'])

  // Methods
  const handleClick = (index: number) => {
    emit('menu-click', index)
  }
</script>
<style lang="scss" scoped>
	.title-container {
		padding: 10px;
		text-align: center;
		display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 500;
    @media (max-width: 640px) {
      font-size: 1.5rem;
    }
	}
</style>
