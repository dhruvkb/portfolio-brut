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

<style lang="css" src="@/styles/base.css"/>
<style lang="css" src="@/styles/components.css"/>
<style lang="css" src="@/styles/utilities.css"/>
<style lang="css">
  #app-root {
    @screen sx {
      grid-template-columns: 480px 1fr;
    }
    @screen mx {
      grid-template-columns: 640px 1fr;
    }
  }
</style>
