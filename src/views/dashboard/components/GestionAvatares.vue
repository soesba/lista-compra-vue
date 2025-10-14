<template>
  <div class="avatares">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        {{ subtitle }}
      </v-card-text>
      <v-card-subtitle v-if="avatares.length === 0">
        No hay avatares disponibles
      </v-card-subtitle>
    </v-card>
    <div class="lista-avatares">
      <div
          v-for="avatar in avatares"
          :key="avatar.id">
        <img
          class="v-avatar"
          :src="avatar.imagen.content"
          height="64px"
        >
          <v-menu activator="parent" :props="avatar">
            <v-list>
              <v-list-item
                v-for="(item, index) in imagenMenu"
                :key="index"
                :value="index">
                <v-list-item-title @click="item.click(avatar.id)">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </img>
      </div>
    </div>
  </div>
  <div class="wrapper-add-button">
    <v-fab
      icon="mdi-plus"
      class="ms-4"
      location="bottom end"
      absolute
      offset
      color="primary"
      @click="addAvatar()"
    ></v-fab>
  </div>
</template>

<script setup lang="ts">
import ImageAdd from '@/components/ImageAdd.vue'
import { uiStore } from '@/main'
import eliminar from '@/services/avatar/eliminarAvatar.service'
import get from '@/services/avatar/getAvatares.service'
import insert from '@/services/avatar/insertAvatar.service'
import Avatar from '@/services/avatar/models/Avatar'
import { markRaw, onMounted, ref } from 'vue'


const title = 'Avatares'
const subtitle = 'Gestiona los avatares disponibles para los usuarios'
const avatares = ref<Avatar[]>([])

const imagenMenu = [
  {
    title: 'Eliminar',
    click: (id: string) => {
      console.log('Eliminar avatar', id)
      uiStore.showConfirmDialog({
          props: {
            text: '¿Desea eliminar el avatar?',
            title: 'Confirmación'
          },
          aceptarFn: () => eliminarAvatar(id)
        })
    }
  }
]

const addAvatar = () => {
  console.log('Add avatar')
  uiStore.showCustomDialog({
    component: markRaw(ImageAdd),
    events: {
      select: (data: any) => {
        insert(data).then(() => {
          loadAvatares()
        }).catch(error => {
          console.error('Error al insertar el avatar:', error)
        })
      }
    }
  })
}

const eliminarAvatar = (id: string) => {
  eliminar(id).then(() => {
    loadAvatares()
  }).catch(error => {
    console.error('Error al eliminar el avatar:', error)
  })
}

const loadAvatares = () => {
  get().then(response => {
    avatares.value = response.data as Avatar[]
  })
}

onMounted(() => {
  console.log('Mounted GestionAvatares')
  loadAvatares()
})

</script>

<style lang="scss" scoped>
.wrapper-add-button {
  position: fixed;
  width: 100%;
  bottom: 40px;
  right: 20px;
}

.lista-avatares {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 10px;
  img {
    cursor: pointer;
  }
}
</style>