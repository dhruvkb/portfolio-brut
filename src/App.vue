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
  import { useSeeelaye } from 'seeelaye'

  import { tree, epics, orgs } from '@/data/resume'

  import Pane from '@/components/layouts/Pane.vue'
  import Slider from '@/components/layouts/Slider.vue'

  import Landing from '@/components/Landing.vue'
  import Detail from '@/components/Detail.vue'
  import CLI from '@/components/CLI.vue'

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
      store.commit('resume/setOrgs', { orgs })
      store.commit('resume/setEpics', { epics })

      const seeelaye = useSeeelaye()
      seeelaye.commit('setTree', { tree })

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
    ::selection {
      @apply text-sol-01 bg-sol-2;
    }

    .panes {
      @screen spb {
        grid-template-columns: 480px 1fr;
      }
      @screen mpb {
        grid-template-columns: 640px 1fr;
      }
    }
  }
</style>
