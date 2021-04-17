<template>
  <table class="work table-fixed w-full text-sol-00 hover:text-sol-1">
    <thead class="border-b border-sol-1">
      <tr class="text-xs uppercase">
        <th
          v-for="(column, index) in columns"
          :key="index"
          class="text-left font-semibold text-sol-1 py-1 px-2 s:first:pl-2 s:last:pr-2 m:first:pl-4 m:last:pr-2 l:first:pl-8 l:last:pr-8 sx:first:pl-2 sx:last:pr-2 mx:first:pl-4 mx:last:pr-4"
          :data-col="column.fieldName">
          {{ column.displayName }}
        </th>
      </tr>
    </thead>
    <tbody class="text-lg border-b border-sol-1">
      <tr
        v-for="(project, storyIndex) in projects"
        :key="storyIndex"
        class="hover:text-sol-01 hover:bg-sol-2 transition-colors duration-250 outline-none"
        role="button"
        tabindex="0">
        <td
          v-for="(column, index) in columns"
          :key="index"
          class="py-1 px-2 s:first:pl-2 s:last:pr-2 m:first:pl-4 m:last:pr-2 l:first:pl-8 l:last:pr-8 sx:first:pl-2 sx:last:pr-2 mx:first:pl-4 mx:last:pr-4">
          {{ project[column.fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
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
  @screen s {
    .work {
      --work-epicName-width: 40%;
      --work-title-width: 60%;
    }
  }

  @screen m {
    .work {
      --work-epicName-width: 20%;
      --work-title-width: 30%;
      --work-technologies-width: 50%;
    }
  }

  @screen l {
    .work {
      --work-epicName-width: 27.5%;
      --work-title-width: 22.5%;
      --work-technologies-width: 50%;
    }
  }

  @screen sx {
    .work {
      --work-epicName-width: 40%;
      --work-title-width: 60%;
    }
  }

  @screen mx {
    .work {
      --work-epicName-width: 20%;
      --work-title-width: 30%;
      --work-technologies-width: 50%;
    }
  }

  .work th[data-col="epicName"] {
    width: var(--work-epicName-width, inherit);
  }

  .work th[data-col="title"] {
    width: var(--work-title-width, inherit);
  }

  .work th[data-col="technologies"] {
    width: var(--work-technologies-width, inherit);
  }
</style>
