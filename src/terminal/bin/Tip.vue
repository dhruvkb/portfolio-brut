<template>
  <div class="tip">
    {{ tip }}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Binary, binComposition } from 'seeelaye'

  export const binaryFn = (): Binary<[], []> => new Binary<[], []>(
    'Tip',
    'tip',
    'Show a tip about the site or the terminal.',
    [],
    [],
  )

  export default defineComponent({
    name: 'Tip',
    setup() {
      binComposition()

      const tips: string[] = []
      const tip = tips[Math.floor(Math.random() * tips.length)]
      return {
        tip,
      }
    },
  })
</script>
