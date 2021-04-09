<template>
  <div id="app-root" class="h-screen sx:grid sx:grid-cols-2">
    <Pane>
      <Landing/>
    </Pane>
    <Pane class="hidden sx:block">
      <Detail/>
    </Pane>
  </div>
</template>

<script>
  import '@/styles/base.css'
  import '@/styles/components.css'
  import '@/styles/utilities.css'

  import Pane from '@/components/Pane.vue'
  import Landing from '@/components/Landing.vue'
  import Detail from '@/components/Detail.vue'

  import { setBreakpoint, addListener } from '@/plugins/responsive'

  export default {
    name: 'App',
    components: {
      Pane,
      Landing,
      Detail,
    },
    created() {
      setBreakpoint()
      addListener()
    },
  }
</script>

<style lang="css">
  @screen mx {
    #app-root {
      grid-template-columns: 640px 1fr;
    }
  }
</style>
