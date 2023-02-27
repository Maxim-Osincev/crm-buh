<template>
  <MainLayout>
    <router-view/>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default defineComponent({
  components: {
    MainLayout,
  }
})
</script>

<style lang="scss">
</style>
