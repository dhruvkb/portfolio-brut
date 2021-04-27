<template>
  <div class="experience-row flex items-center">
    <div
      v-for="([columnField, columnName, columnGrow], columnIndex) in columns"
      :key="columnIndex"
      class="resume-cell"
      :style="{ flexGrow: columnGrow, flexBasis: 0 }">
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
        {{ columnName }}
      </template>
    </div>
  </div>
</template>

<script>
  import automattic from 'simple-icons/icons/automattic'
  import creativecommons from 'simple-icons/icons/creativecommons'
  import fampay from 'simple-icons/icons/fampay'
  import hackerearth from 'simple-icons/icons/hackerearth'
  import img from '@/data/img.json'
  import browserstack from '@/data/browserstack.json'

  import Icon from '@/components/landing/Icon.vue'

  import { Role } from '@/models/role'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'ExperienceRow',
    components: {
      Icon,
    },
    props: {
      role: {
        type: Role,
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
        },
      }
    },
    computed: {
      columns() {
        const orgName = ['orgName', 'Org']
        const orgIcon = ['orgIcon', 'Org']
        const type = ['type', 'Type']
        const title = ['title', 'Role']
        const isActive = ['isActive', '']
        const periodText = ['periodText', 'Period']

        let columns
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
              [...type, 16.67],
              [...title, 45],
              [...isActive, 5],
            ]
            break
          case 'l':
            columns = [
              [...orgName, 27.5],
              [...type, 15],
              [...title, 35],
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
      paths() {
        const icon = this.icons[this.role.orgIcon]
        const paths = icon.paths ?? [{ d: icon.path }]
        return paths.map(path => ({
          d: path.d,
          fill: path.hex ?? 'currentColor',
          'fill-rule': path.fillRule ?? 'nonzero',
        }))
      },
    },
  }
</script>
