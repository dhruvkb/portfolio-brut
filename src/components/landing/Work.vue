<template>
  <div class="work text-sol-00 hover:text-sol-1 s:border-b s:border-sol-1">
    <div class="works grid font-semibold text-xs uppercase text-sol-1 border-b border-sol-1">
      <div
        v-for="([,column], columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell">
        {{ column }}
      </div>
    </div>
    <div
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="works grid text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors z:border-b s:border-none border-sol-1 outline-none"
      role="button"
      tabindex="0"
      @click="handleClick(project)">
      <div
        v-for="([column,], columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell"
        :style="{ gridArea: column }">
        {{ project[column] }}
      </div>
    </div>
  </div>
</template>

<script>
  import { breakpoint } from '@/plugins/responsive'

  import { Project } from '@/models/project'

  import epics from '@/data/work.json'

  export default {
    name: 'Work',
    data() {
      return {
        breakpoint,
        rangeIndicator: '\u2013',
      }
    },
    computed: {
      columns() {
        const epicName = ['epicName', 'Epic']
        const title = ['title', 'Project']
        const technologiesText = ['technologiesText', 'Tech']

        let columns
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [epicName, title]
            break
          case 'm':
          case 'mx':
            columns = [epicName, title, technologiesText]
            break
          default: // l and z
            columns = [epicName, title, technologiesText]
            break
        }
        return columns
      },
      projects() {
        return Project.parse(epics)
      },
    },
    methods: {
      populateInput(project) {
        if (this.$store.hasModule('terminal')) {
          this.$store.commit('terminal/setCommandInput', {
            commandInput: `cat ~${project.nodePath}`,
          })
        }
      },
      handleClick(project) {
        this.populateInput(project)
      },
    },
  }
</script>

<style scoped lang="css">
  .works {
    @screen z {
      --works-cols: 60% 40%;
      grid-template-rows: repeat(2, auto);
      grid-template-areas: "epicName title" "technologiesText technologiesText";
    }
    @screen s {
      --works-cols: 40% 60%;
      grid-template-areas: "epicName title";
    }
    @screen m {
      --works-cols: 20% 30% 50%;
      grid-template-areas: "epicName title technologiesText";
    }
    @screen l {
      --works-cols: 27.5% 22.5% 50%;
      grid-template-areas: "epicName title technologiesText";
    }
    @screen sx {
      --works-cols: 40% 60%;
      grid-template-areas: "epicName title";
    }
    @screen mx {
      --works-cols: 20% 30% 50%;
      grid-template-areas: "epicName title technologiesText";
    }

    grid-template-columns: var(--works-cols);
  }
</style>
