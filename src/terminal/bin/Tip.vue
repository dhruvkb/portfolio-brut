<template>
  <div class="tip">
    {{ tip }}
  </div>
</template>

<script>
  import { Binary, binComposition } from 'seeelaye'

  export const binaryFn = () => new Binary(
    'Tip',
    'tip',
    'Show a tip about the site or the terminal.',
    [],
    [],
  )

  export default {
    name: 'Tip',
    setup() {
      binComposition()

      const tips = []
      const tip = tips[Math.floor(Math.random() * tips.length)]
      return {
        tip,
      }
    },
  }
</script>
