<template>
  <div class="work text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <WorkRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <WorkRow
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :class="[...project.isLast ? ['border-b', 'border-sol-2'] : []]"
      :project="project"
      @click="handleClick(project)"/>
  </div>
</template>

<script lang="ts">
  import type { Project } from '@/models/project'

  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

  import WorkRow from '@/components/landing/WorkRow.vue'

  export default defineComponent({
    name: 'Work',
    components: {
      WorkRow,
    },
    computed: {
      ...mapGetters('resume', [
        'projects',
      ]),
    },
    methods: {
      populateInput(project: Project): void {
        if (this.$store.hasModule('terminal')) {
          this.$seeelaye.commit('setInput', {
            input: `cat ~${project.nodePath}`,
          })
        }
      },
      handleClick(project: Project): void {
        this.populateInput(project)
      },
    },
  })
</script>
