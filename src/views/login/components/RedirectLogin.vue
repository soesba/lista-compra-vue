<template>
  <div id="loading">
    <div class="content">
      <i class="pi pi-spin pi-spinner" style="font-size: 5em"></i>
      <h4 class="text">
        {{ text }}
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoadMask'
})
</script>

<script setup lang="ts">

  defineProps({
    text: {
      type: String,
      default: 'Redirigiendo al login...'
    }
  })

</script>

<style lang="scss" scoped>
#loading {
  display: flex;
  justify-content: center;
  background-color: #02307B;
  color: white;
  top: 0;
  left: 0;
  height:100vh;
  width: 100vw;
  position: fixed;
  font-size: 32px;
  text-align: center;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.img-loading {
  width: 125px;
  height: 125px;
}
</style>
