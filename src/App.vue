<template>
  <div class="overflow-x-hidden">
    <div
      class="h-screen spb:grid spb:grid-cols-2 mb:mr-8"
      id="app-root">
      <Pane><Landing/></Pane>
      <Pane v-if="sliderContents === 'cli'"><Detail/></Pane>
    </div>
    <Slider :contents="sliderContents">
      <CLI v-if="sliderContents === 'cli'"/>
      <Detail v-else/>
    </Slider>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  import { IOrg, Org } from '@/models/org'
  import { IEpic, Epic } from '@/models/epic'

  import Pane from '@/components/layouts/Pane.vue'
  import Slider from '@/components/layouts/Slider.vue'

  import Landing from '@/components/Landing.vue'
  import Detail from '@/components/Detail.vue'
  import CLI from '@/components/CLI.vue'

  import orgs from '@/data/experience.json'
  import epics from '@/data/work.json'
  import debounce from 'lodash/debounce'

  export default defineComponent({
    name: 'App',
    components: {
      Pane,
      Slider,

      Landing,
      Detail,
      CLI,
    },
    setup() {
      const store = useStore()
      const allOrgs = (orgs.children as IOrg[]).map(Org.parse)
      store.commit('resume/setOrgs', {
        orgs: allOrgs,
      })
      const allEpics = (epics.children as IEpic[]).map(Epic.parse)
      store.commit('resume/setEpics', {
        epics: allEpics,
      })

      const setBreakpoint = () => store.commit('ui/setViewportWidth')
      setBreakpoint()
      window.addEventListener(
        'resize',
        debounce(setBreakpoint, 100),
        false,
      )
      const sliderContents = computed(() => store.getters['ui/sliderContents'])

      return {
        sliderContents,
      }
    },
  })
</script>

<style lang="css" src="@/styles/base.css"/>
<style lang="css" src="@/styles/components.css"/>
<style lang="css" src="@/styles/utilities.css"/>
<style lang="css">
  #app-root {
    @screen spb {
      grid-template-columns: 480px 1fr;
    }
    @screen mpb {
      grid-template-columns: 640px 1fr;
    }
  }
</style>
