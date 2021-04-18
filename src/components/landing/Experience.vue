<template>
  <div class="experience border-b border-sol-1 text-sol-00 hover:text-sol-1">
    <div class="experiences grid font-semibold text-xs uppercase text-sol-1 border-b border-sol-1">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell">
        {{ column.displayName }}
      </div>
    </div>
    <div
      v-for="(role, roleIndex) in roles"
      :key="roleIndex"
      class="experiences grid text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      role="button"
      tabindex="0">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell">
        <template v-if="column.fieldName === 'isActive'">
          <div
            class="inline-block align-middle h-2.5 w-2.5 border border-curr rounded-full"
            :class="[{ 'bg-curr': role.isActive }]"
            :title="role.isActive ? 'Current' : 'Completed'"/>
        </template>
        <template v-else>
          {{ role[column.fieldName] }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { breakpoint } from '@/plugins/responsive'

  import { Role } from '@/models/role'

  import orgs from '@/data/experience.json'

  export default {
    name: 'Experiences',
    data() {
      return {
        breakpoint,
        rangeIndicator: '\u2013',
      }
    },
    computed: {
      columns() {
        const orgName = {
          fieldName: 'orgName',
          displayName: 'Org',
        }
        const type = {
          fieldName: 'type',
          displayName: 'Type',
        }
        const role = {
          fieldName: 'title',
          displayName: 'Role',
        }
        const isActive = {
          fieldName: 'isActive',
          displayName: '',
        }
        const period = {
          fieldName: 'periodText',
          displayName: 'Period',
        }

        let columns
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [orgName, role]
            break
          case 'm':
          case 'mx':
            columns = [orgName, type, role, isActive]
            break
          default:
            columns = [orgName, type, role, period]
            break
        }
        return columns
      },
      roles() {
        return Role.parse(orgs)
      },
    },
  }
</script>

<style scoped lang="css">
  .experiences {
    @screen s {
      --experiences-cols: 40% 60%;
    }
    @screen m {
      --experiences-cols: 33.33% 16.67% 45% 5%;
    }
    @screen l {
      --experiences-cols: 27.5% 15% 35% 22.5%;
    }
    @screen sx {
      --experiences-cols: 40% 60%;
    }
    @screen mx {
      --experiences-cols: 33.33% 16.67% 45% 5%;
    }

    grid-template-columns: var(--experiences-cols);
  }
</style>
