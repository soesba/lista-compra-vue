<template>
  <div class="card-list_wrapper">
    <div class="card-list_container" :class="cardClass">
      <slot name="card-list_content"></slot>
      <slot name="card-list_empty" />
    </div>
    <div v-if="addButton" class="wrapper-add-button">
      <v-fab
        icon="mdi-plus"
        class="ms-4"
        location="bottom end"
        absolute
        offset
        color="primary"
        @click="addCard()"></v-fab>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { eventStore } from '@/main'
  import router from '@/router'
  import { ref } from 'vue'
  import OrderRequest from '@/services/commons/models/OrderRequest'

  const emit = defineEmits(['addCard', 'sortCards'])

  eventStore.$onAction(({ args, name }) => {
    switch (name) {
      case 'sortCards':
        onSortCards(args[0])
        break
      case 'showCards':
        onShowCards(args[0])
        break
    }
  })

  const props = defineProps({
    addButton: {
      type: Boolean,
      default: true
    },
    class: {
      type: String,
      default: 'card'
    }
  })

  const cardClass = ref([props.class])
  const routes = eventStore.getRoutes

  // Methods
  const addCard = () => {
    router.push(routes.add)
  }

  const onSortCards = (evt: any) => {
    const orderBy: OrderRequest = {
      field: evt.field,
      direction: evt.order === 1 ? 'asc' : 'desc'
    }
    emit('sortCards', orderBy)
  }

  const onShowCards = (evt: any) => {
    switch (evt.show) {
      case 0:
        cardClass.value = ['card', 'small']
        break
      case 1:
        cardClass.value = ['card', 'large']
        break
      case 2:
        cardClass.value = ['list']
        break
    case 3:
        cardClass.value = ['detail-list']
        break
    }
  }
</script>
<style lang="scss" scoped>
  .card-list_wrapper {
    color: rgb(var(--v-theme-primary));
    .wrapper-add-button {
      position: fixed;
      width: 100%;
      bottom: 40px;
      right: 20px;
    }
    .card-list_container {
      &.card {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
        :deep(.v-card) {
          height: 145px;
        }
      }
      &.large {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        margin-bottom: 60px; // salvar boton de añadir
        :deep(.v-card) {
          height: 145px;
        }
      }
      &.list {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
        :deep(.v-card) {
          width: 90%;
          max-width: 90%;
          display: flex;
          flex-direction: row;
          text-align: left;
          .v-card-title {
            color: rgb(var(--v-theme-primary));
            flex: 1.5;
            @media (max-width: 640px) {
              flex: 3;
              font-size: 1rem;
            }
          }
          .v-card-subtitle {
            flex: 1;
            align-self: center;
            font-size: 1rem;
            min-height: 19.94px;
            @media (max-width: 640px) {
              display: none;
            }
          }
          .text-small {
            flex: 1;
            text-align: right;
          }

          .logo {
            height: 64px;
            width: auto;
          }
        }
      }
      &.detail-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 auto;
        margin-bottom: 60px; // salvar boton de añadir
        :deep(a) {
          width: 90%;
          max-width: 90%;
        }
        :deep(.v-card) {
          // box-shadow: none;
          // margin: 0px;
          display: flex;
          flex-direction: column;
          text-align: left;
          .v-card-title {
            font-size: 1.2rem;
            margin-bottom: 8px;
          }
          .v-card-subtitle {
            font-size: 1rem;
            margin-bottom: 8px;
          }
          .text-small {
            text-align: right;
          }

          .logo {
            height: 64px;
            width: auto;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
</style>
