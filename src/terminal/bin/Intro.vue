<template>
  <RouterLink to="/">
    <pre class="intro inline-block font-bold site-title">
  __   __                                __       __
 /\ \ /\ \                              /\ \     /\ \
 \_\ \\ \ \___    _ __   __  __   __  __\ \ \/'\ \ \ \____
 /'_` \\ \  _ `\ /\`'__\/\ \/\ \ /\ \/\ \\ \ , /_ \ \ '__`\
/\ \L\ \\ \ \ \ \\ \ \/ \ \ \_\ \\ \ \_/ |\ \ \\`\ \ \ \L\ \
\ \___,_\\ \_\ \_\\ \_\  \ \____/ \ \___/  \ \_\ \_\\ \_,__/
 \/__,_ / \/_/\/_/ \/_/   \/___/   \/__/    \/_/\/_/ \/___/</pre>
  </RouterLink>
</template>

<script>
  import { Binary, binComposition } from 'seeelaye'

  export const binaryFn = () => new Binary(
    'Intro',
    'intro',
    'Shows my handle as ASCII art.',
    [],
    [],
  )

  export default {
    name: 'Intro',
    setup() {
      binComposition()
    },
  }
</script>
