<template>
  <div class="work text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <WorkRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <WorkRow
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :project="project"
      @click="handleClick(project)"/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import WorkRow from '@/components/landing/WorkRow.vue'

  import { Epic } from '@/models/epic'

  import epics from '@/data/work.json'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'Work',
    components: {
      WorkRow,
    },
    data() {
      return {
        breakpoint,
      }
    },
    computed: {
      ...mapGetters('resume', [
        'projects',
      ]),
    },
    methods: {
      populateInput(project) {
        if (this.$store.hasModule('terminal')) {
          this.$seeelaye.commit('setInput', {
            input: `cat ~${project.nodePath}`,
          })
        }
      },
      handleClick(project) {
        this.populateInput(project)
      },
      ...mapMutations('resume', [
        'setEpics',
      ]),
    },
    mounted() {
      const allEpics = Epic.parse(epics.children)
      this.setEpics({
        epics: allEpics,
      })
    },
  }
</script>
