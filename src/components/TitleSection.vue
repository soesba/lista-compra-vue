<template>
  <div class="title-container">
    <label class="titulo">{{ titulo }}</label>
    <label class="subtitulo" v-if="subtitulo">{{ subtitulo }}</label>
  </div>
  <div class="aviso-seccion" v-if="aviso">
    {{ aviso }}
  </div>
</template>
<script setup lang="ts">
  defineProps({
    titulo: {
      type: String,
      required: true
    },
    subtitulo: {
      type: String,
      required: false
    },
    aviso: {
      type: String,
      required: false
    }
  })
</script>
<style lang="scss" scoped>
  .title-container {
    padding: 10px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    color: rgb(var(--v-theme-primary));
    .subtitulo {
      display: block;
      flex: none;
      font-size: 0.75rem;
      font-weight: 400;
      letter-spacing: 0.0178571429em;
      opacity: var(--v-card-subtitle-opacity, var(--v-medium-emphasis-opacity));
      overflow: hidden;
      padding: 0 1rem;
      // text-overflow: ellipsis;
      text-transform: none;
      white-space: nowrap;
    }
    @media (max-width: 640px) {
      font-size: 1rem;
    }
  }
  .aviso-seccion {
    border: 1px solid rgb(var(--v-theme-primary));
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    color: rgb(var(--v-theme-primary));
  }
</style>
