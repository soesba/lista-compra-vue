<template>
  <v-overlay
    :model-value="overlay"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      size="64"
      indeterminate
    >
    </v-progress-circular>
    <div class="label-mask">{{ text }}</div>
  </v-overlay>
</template>
<script lang="ts" setup>
import { uiStore } from '@/main';
import { computed } from 'vue';

const overlay = computed(() => {
  return uiStore.getMask.show
})

const text = computed(() => {
  console.log('Mask text:', uiStore.getMaskText)
  return uiStore.getMaskText
})
</script>
<style lang="scss" scoped>
:deep(.v-overlay__content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  .label-mask {
    margin-top: 16px;
    font-size: 1.2rem;
    color: rgb(var(--v-theme-primary));
  }
}
</style>