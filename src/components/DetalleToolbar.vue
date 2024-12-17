<template>
  <div class="wrapper">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'DetalleToolbar',
})
</script>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  .left {
    display: flex;
    flex: 0.33;
    justify-content: flex-start;
  }
  .center {
    display: flex;
    flex: 0.33;
    justify-content: center
  }
  .right {
    display: flex;
    flex: 0.33;
    justify-content: flex-end;
  }
}
</style>
