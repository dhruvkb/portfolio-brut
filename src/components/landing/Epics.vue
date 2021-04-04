<template>
  <table class="epics table-fixed w-full text-sol-00 hover:text-sol-1">
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
        v-for="(story, storyIndex) in stories"
        :key="storyIndex"
        class="hover:text-sol-01 hover:bg-sol-2 transition-colors duration-250 outline-none"
        role="button"
        tabindex="0">
        <td
          v-for="(column, index) in columns"
          :key="index"
          class="py-1 px-2 s:first:pl-2 s:last:pr-2 m:first:pl-4 m:last:pr-2 l:first:pl-8 l:last:pr-8 sx:first:pl-2 sx:last:pr-2 mx:first:pl-4 mx:last:pr-4">
          {{ story[column.fieldName] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { breakpoint } from '@/plugins/responsive'

  import epics from '@/data/epics.json'

  export default {
    name: 'Epics',
    data() {
      return {
        breakpoint,
        activeIndicator: '*',
        rangeIndicator: '–',
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
          fieldName: 'technologies',
          displayName: 'Tech',
        }

        let columns
        if (['s', 'sx'].includes(breakpoint.name)) {
          columns = [epicName, title]
        } else if (['m', 'mx'].includes(breakpoint.name)) {
          columns = [epicName, title, technologies]
        } else if (breakpoint.name === 'l') {
          columns = [epicName, title, technologies]
        }
        return columns
      },
      stories() {
        const stories = []
        epics.forEach((epic) => {
          epic.stories.forEach((story) => {
            let { technologies } = story
            technologies = technologies.join(', ')
            stories.push({
              ...story,
              technologies,
              epicName: epic.title,
            })
          })
        })
        return stories
      },
    },
  }
</script>

<style scoped lang="css">
  @screen s {
    .epics {
      --epics-epicName-width: 40%;
      --epics-title-width: 60%;
    }
  }

  @screen m {
    .epics {
      --epics-epicName-width: 20%;
      --epics-title-width: 30%;
      --epics-technologies-width: 50%;
    }
  }

  @screen l {
    .epics {
      --epics-epicName-width: 20%;
      --epics-title-width: 22.5%;
      --epics-technologies-width: 57.5%;
    }
  }

  @screen sx {
    .epics {
      --epics-epicName-width: 40%;
      --epics-title-width: 60%;
    }
  }

  @screen mx {
    .epics {
      --epics-epicName-width: 20%;
      --epics-title-width: 30%;
      --epics-technologies-width: 50%;
    }
  }

  .epics th[data-col="epicName"] {
    width: var(--epics-epicName-width, inherit);
  }

  .epics th[data-col="title"] {
    width: var(--epics-title-width, inherit);
  }

  .epics th[data-col="technologies"] {
    width: var(--epics-technologies-width, inherit);
  }
</style>
