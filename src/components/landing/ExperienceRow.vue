<template>
  <div class="experience-row flex items-center">
    <div
      v-for="([columnField, columnName, widthPercent], columnIndex) in columns"
      :key="columnIndex"
      class="resume-cell"
      :style="{ '--width-percent': widthPercent }">
      <template v-if="role">
        <template v-if="columnField === 'isActive'">
          <div
            class="inline-block align-middle h-2.5 w-2.5 border border-curr rounded-full"
            :class="[{ 'bg-curr': role.isActive }]"
            :title="role.isActive ? 'Current' : 'Completed'"/>
        </template>
        <template v-else-if="columnField === 'orgIcon'">
          <Icon :paths="paths"/>
        </template>
        <template v-else>
          {{ role[columnField] }}
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

  import type { ISimpleIcon, ICustomIcon, IPath } from '@/models/icon'
  import type { Role } from '@/models/role'

  import { defineComponent } from 'vue'

  import automattic from 'simple-icons/icons/automattic'
  import creativecommons from 'simple-icons/icons/creativecommons'
  import fampay from 'simple-icons/icons/fampay'
  import hackerearth from 'simple-icons/icons/hackerearth'

  import { breakpoint } from '@/plugins/responsive'

  import Icon from '@/components/landing/Icon.vue'

  import img from '@/assets/icons/img.json'
  import browserstack from '@/assets/icons/browserstack.json'
  import centerOfCi from '@/assets/icons/center_of_ci.json'

  export default defineComponent({
    name: 'ExperienceRow',
    components: {
      Icon,
    },
    props: {
      role: {
        type: Object as PropType<Role>,
      },
    },
    data() {
      return {
        icons: {
          automattic,
          creativecommons,
          fampay,
          hackerearth,
          img,
          browserstack,
          centerOfCi,
        } as Record<string, ISimpleIcon | ICustomIcon>,
      }
    },
    computed: {
      columns(): [string, string, number][] {
        const orgName: [string, string] = ['orgName', 'Org']
        const orgIcon: [string, string] = ['orgIcon', 'Org']
        const type: [string, string] = ['type', 'Type']
        const title: [string, string] = ['title', 'Role']
        const isActive: [string, string] = ['isActive', '']
        const periodText: [string, string] = ['periodText', 'Period']

        let columns: [string, string, number][]
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [
              [...orgName, 40],
              [...title, 60],
            ]
            break
          case 'm':
          case 'mx':
            columns = [
              [...orgName, 33.33],
              [...title, 45],
              [...type, 16.67],
              [...isActive, 5],
            ]
            break
          case 'l':
            columns = [
              [...orgName, 27.5],
              [...title, 35],
              [...type, 15],
              [...periodText, 22.5],
            ]
            break
          default: // z
            columns = [
              [...orgIcon, 10],
              [...title, 90],
            ]
            break
        }
        return columns
      },
      paths(): IPath[] {
        if (!this.role) return [] as IPath[]

        const icon = this.icons[this.role.orgIcon]
        const paths: IPath[] = []
        if ('paths' in icon) { // ICustomIcon
          paths.push(...icon.paths.map((path) => ({
            d: path.d,
            'fill-rule': path['fill-rule'],
          })))
        } else { // ISimpleIcon
          paths.push({
            d: icon.path,
            'fill-rule': 'nonzero',
          })
        }
        return paths
      },
    },
  })
</script>
