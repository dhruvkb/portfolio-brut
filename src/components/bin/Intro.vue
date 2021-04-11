<template>
  <pre class="intro inline-block font-bold site-title">
  __   __                                __       __
 /\ \ /\ \                              /\ \     /\ \
 \_\ \\ \ \___    _ __   __  __   __  __\ \ \/'\ \ \ \____
 /'_` \\ \  _ `\ /\`'__\/\ \/\ \ /\ \/\ \\ \ , /_ \ \ '__`\
/\ \L\ \\ \ \ \ \\ \ \/ \ \ \_\ \\ \ \_/ |\ \ \\`\ \ \ \L\ \
\ \___,_\\ \_\ \_\\ \_\  \ \____/ \ \___/  \ \_\ \_\\ \_,__/
 \/__,_ / \/_/\/_/ \/_/   \/___/   \/__/    \/_/\/_/ \/___/</pre>
</template>

<script>
  import bin from '@/mixins/bin'

  export default {
    name: 'Intro',
    command: 'intro',
    description: 'Take a moment and enjoy some ASCII art',
    mixins: [
      bin,
    ],
  }
</script>
