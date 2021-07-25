<template>
  <div class="work-row flex items-center">
    <div
      v-for="([columnField, columnName, widthPercent], columnIndex) in columns"
      :key="columnIndex"
      class="resume-cell"
      :style="{ '--width-percent': widthPercent }">
      <template v-if="project">
        <template v-if="columnField === 'technologyIcon'">
          <Technology :icon="project.technologyIcon"/>
        </template>
        <template v-else-if="columnField === 'technologies'">
          <template
            v-for="(technology, index) in project.technologies"
            :key="index">
            <Technology
              :icon="technology.icon"
              :name="technology.name"/>
            <template v-if="index < project.technologies.length - 1">,</template>
          </template>
        </template>
        <template v-else>
          {{ project[columnField] }}
        </template>
      </template>

      <template v-else>
        <!-- Header row -->
        {{ columnName }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import type { Project } from '@/models/project'

  import { defineComponent } from 'vue'

  import Technology from '@/components/landing/Technology.vue'

  import { breakpoint } from '@/plugins/responsive'

  export default defineComponent({
    name: 'WorkRow',
    components: {
      Technology,
    },
    props: {
      project: {
        type: Object as PropType<Project>,
      },
    },
    computed: {
      columns(): [string, string, number][] {
        const epicName: [string, string] = ['epicName', 'Epic']
        const title: [string, string] = ['title', 'Project']
        const technologyIcon: [string, string] = ['technologyIcon', 'Tech']
        const technologiesText: [string, string] = ['technologiesText', 'Tech']
        const technologies: [string, string] = ['technologies', 'Tech']

        let columns: [string, string, number][]
        switch (breakpoint.name) {
          case 's':
          case 'spb':
            columns = [
              [...epicName, 40],
              [...title, 60],
            ]
            break
          case 'mb':
          case 'mpb':
            columns = [
              [...epicName, 20],
              [...title, 30],
              [...technologiesText, 50],
            ]
            break
          case 'lb':
            columns = [
              [...epicName, 20],
              [...title, 30],
              [...technologies, 50],
            ]
            break
          default: // z
            columns = [
              [...technologyIcon, 10],
              [...epicName, 36], // 40% of 90
              [...title, 54], // 60% of 90
            ]
            break
        }
        return columns
      },
    },
  })
</script>
