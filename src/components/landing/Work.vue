<template>
  <div class="work text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <WorkRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <WorkRow
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :class="[...project.isLast ? ['border-b', 'border-sol-2'] : []]"
      :project="project"
      @click="populateInput(project)"/>
  </div>
</template>

<script lang="ts">
  import type { Project } from '@/models/project'

  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { useSeeelaye } from 'seeelaye'

  import { breakpoint } from '@/plugins/responsive'

  import WorkRow from '@/components/landing/WorkRow.vue'

  export default defineComponent({
    name: 'Work',
    components: {
      WorkRow,
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const seeelaye = useSeeelaye()

      const projects = computed(() => store.getters['resume/projects'])

      const populateInput = (project: Project) => {
        if (store.state.ui.isSliderOpen && breakpoint.sliderContents === 'cli') {
          seeelaye.commit('setInput', {
            input: `cat ~${project.nodePath}`,
          })
        } else {
          router.push({ path: project.nodePath })
        }
      }

      return {
        projects,
        populateInput,
      }
    },
  })
</script>
