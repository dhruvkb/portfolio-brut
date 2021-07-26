<template>
  <div class="exit">Bye!</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Binary, binComposition, useSeeelaye } from 'seeelaye'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
    'Exit',
    'exit',
    'Close the terminal drawer.',
    [],
    [],
  )

  export default defineComponent({
    name: 'Exit',
    setup() {
      binComposition()

      const seeelaye = useSeeelaye()
      seeelaye.store.commit('ui/setIsSliderOpen', {
        isSliderOpen: false,
      })
    },
  })
</script>
