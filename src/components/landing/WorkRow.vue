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
        <!-- Header row -->
        {{ columnName }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'

  import { ISimpleIcon, IPath } from '@/models/icon'
  import type { Project } from '@/models/project'

  import { defineComponent } from 'vue'

  import django from 'simple-icons/icons/django'
  import docker from 'simple-icons/icons/docker'
  import gnubash from 'simple-icons/icons/gnubash'
  import javascript from 'simple-icons/icons/javascript'
  import latex from 'simple-icons/icons/latex'
  import python from 'simple-icons/icons/python'
  import readthedocs from 'simple-icons/icons/readthedocs'
  import tailwindcss from 'simple-icons/icons/tailwindcss'
  import typescript from 'simple-icons/icons/typescript'
  import vuedotjs from 'simple-icons/icons/vuedotjs'

  import Icon from '@/components/landing/Icon.vue'

  import { breakpoint } from '@/plugins/responsive'

  export default defineComponent({
    name: 'WorkRow',
    components: {
      Icon,
    },
    props: {
      project: {
        type: Object as PropType<Project>,
      },
    },
    data() {
      return {
        icons: {
          django,
          docker,
          gnubash,
          javascript,
          latex,
          python,
          readthedocs,
          tailwindcss,
          typescript,
          vuedotjs,
        } as Record<string, ISimpleIcon>,
      }
    },
    computed: {
      columns(): [string, string, number][] {
        const epicName: [string, string] = ['epicName', 'Epic']
        const title: [string, string] = ['title', 'Project']
        const technologyIcon: [string, string] = ['technologyIcon', 'Tech']
        const technologiesText: [string, string] = ['technologiesText', 'Tech']

        let columns: [string, string, number][]
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
      paths(): IPath[] {
        if (!this.project) return []

        const icon = this.icons[this.project.technologyIcon]
        return [
          {
            d: icon.path,
            'fill-rule': 'nonzero',
          },
        ]
      },
    },
  })
</script>
