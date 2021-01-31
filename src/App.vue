<template>
  <div id="app-root" class="h-screen tp:grid tp:grid-cols-2">
    <Pane>
      <Landing/>
    </Pane>
    <Pane>
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

  export default {
    name: 'App',
    components: {
      Pane,
      Landing,
      Detail,
    },
  }
</script>
