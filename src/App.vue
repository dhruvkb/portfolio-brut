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

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import Pane from '@/components/Pane.vue'
  import Landing from '@/components/Landing.vue'
  import Detail from '@/components/Detail.vue'

  import { setBreakpoint, addListener } from '@/plugins/responsive'

  import { IOrg, Org } from '@/models/org'
  import { IEpic, Epic } from '@/models/epic'

  import orgs from '@/data/experience.json'
  import epics from '@/data/work.json'

  export default defineComponent({
    name: 'App',
    components: {
      Pane,
      Landing,
      Detail,
    },
    setup() {
      setBreakpoint()
      addListener()

      const store = useStore()
      const allOrgs = (orgs.children as IOrg[]).map(Org.parse)
      store.commit('resume/setOrgs', {
        orgs: allOrgs,
      })
      const allEpics = (epics.children as IEpic[]).map(Epic.parse)
      store.commit('resume/setEpics', {
        epics: allEpics,
      })
    },
  })
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
