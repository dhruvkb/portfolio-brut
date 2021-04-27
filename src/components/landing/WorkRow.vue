<template>
  <div class="work-row flex items-center">
    <div
      v-for="([columnField, columnName, columnGrow], columnIndex) in columns"
      :key="columnIndex"
      class="resume-cell"
      :style="{ flexGrow: columnGrow, flexBasis: 0 }">
      <template v-if="project">
        <template v-if="columnField === 'technologyIcon'">
          <Icon :paths="paths"/>
        </template>
        <template v-else>
          {{ project[columnField] }}
        </template>
      </template>

      <template v-else>
        {{ columnName }}
      </template>
    </div>
  </div>
</template>

<script>
  import docker from 'simple-icons/icons/docker'
  import javascript from 'simple-icons/icons/javascript'
  import latex from 'simple-icons/icons/latex'
  import python from 'simple-icons/icons/python'
  import readTheDocs from 'simple-icons/icons/readthedocs'

  import Icon from '@/components/landing/Icon.vue'

  import { Project } from '@/models/project'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'WorkRow',
    components: {
      Icon,
    },
    props: {
      project: {
        type: Project,
      },
    },
    data() {
      return {
        icons: {
          docker,
          javascript,
          latex,
          python,
          readTheDocs,
        },
      }
    },
    computed: {
      columns() {
        const epicName = ['epicName', 'Epic']
        const title = ['title', 'Project']
        const technologyIcon = ['technologyIcon', 'Tech']
        const technologiesText = ['technologiesText', 'Tech']

        let columns
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [
              [...epicName, 40],
              [...title, 60],
            ]
            break
          case 'm':
          case 'mx':
            columns = [
              [...epicName, 20],
              [...title, 30],
              [...technologiesText, 50],
            ]
            break
          case 'l':
            columns = [
              [...epicName, 20],
              [...title, 30],
              [...technologyIcon, 0],
              [technologiesText[0], '', 50],
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
      paths() {
        const icon = this.icons[this.project.technologyIcon]
        return [
          {
            d: icon.path,
            fill: 'currentColor',
          },
        ]
      },
    },
  }
</script>
