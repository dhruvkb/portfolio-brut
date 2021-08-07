<template>
  <div
    class="landing flex flex-col min-h-full transition duration-300"
    :class="[...isLandingInactive ? ['filter', 'blur-sm', 'pointer-events-none'] : []]">
    <Hello class="flex-grow"/>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import Hello from '@/components/landing/Hello.vue'

  export default defineComponent({
    name: 'Landing',
    components: {
      Hello,
    },
    setup() {
      const store = useStore()
      const isLandingInactive = computed(() => store.getters['ui/isLandingInactive'])

      return {
        isLandingInactive,
      }
    },
  })
</script>
