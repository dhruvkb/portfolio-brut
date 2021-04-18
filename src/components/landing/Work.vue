<template>
  <div class="work border-b border-sol-1 text-sol-00 hover:text-sol-1">
    <div class="works grid font-semibold text-xs uppercase text-sol-1 border-b border-sol-1">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell">
        {{ column.displayName }}
      </div>
    </div>
    <div
      v-for="(project, projectIndex) in projects"
      :key="projectIndex"
      class="works grid text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      role="button"
      tabindex="0">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell">
        {{ project[column.fieldName] }}
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
        const epicName = {
          fieldName: 'epicName',
          displayName: 'Epic',
        }
        const title = {
          fieldName: 'title',
          displayName: 'Project',
        }
        const technologies = {
          fieldName: 'technologiesText',
          displayName: 'Tech',
        }

        let columns
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [epicName, title]
            break
          case 'm':
          case 'mx':
            columns = [epicName, title, technologies]
            break
          default:
            columns = [epicName, title, technologies]
            break
        }
        return columns
      },
      projects() {
        return Project.parse(epics)
      },
    },
  }
</script>

<style scoped lang="css">
  .works {
    @screen s {
      --works-cols: 40% 60%;
    }
    @screen m {
      --works-cols: 20% 30% 50%;
    }
    @screen l {
      --works-cols: 27.5% 22.5% 50%;
    }
    @screen sx {
      --works-cols: 40% 60%;
    }
    @screen mx {
      --works-cols: 20% 30% 50%;
    }

    grid-template-columns: var(--works-cols);
  }
</style>
