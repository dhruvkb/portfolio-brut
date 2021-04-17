<template>
  <table class="experience table-fixed w-full text-sol-00 hover:text-sol-1">
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
        v-for="(role, roleIndex) in roles"
        :key="roleIndex"
        class="hover:text-sol-01 hover:bg-sol-2 transition-colors duration-250 outline-none"
        role="button"
        tabindex="0">
        <td
          v-for="(column, index) in columns"
          :key="index"
          class="py-1 px-2 s:first:pl-2 s:last:pr-2 m:first:pl-4 m:last:pr-2 l:first:pl-8 l:last:pr-8 sx:first:pl-2 sx:last:pr-2 mx:first:pl-4 mx:last:pr-4">
          <template v-if="column.fieldName === 'isActive'">
            <div
              class="inline-block align-middle h-2.5 w-2.5 border border-curr rounded-full"
              :class="[{ 'bg-curr': role.isActive }]"
              :title="role.isActive ? 'Current' : 'Completed'"/>
          </template>
          <template v-else>
            {{ role[column.fieldName] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { breakpoint } from '@/plugins/responsive'

  import { Role } from '@/models/role'

  import orgs from '@/data/experience.json'

  export default {
    name: 'Experience',
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
            columns = [orgName, role, isActive]
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
  @screen s {
    .experience {
      --experience-orgName-width: 40%;
      --experience-title-width: 55%;
      --experience-isActive-width: 5%;
    }
  }

  @screen m {
    .experience {
      --experience-orgName-width: 33.33%;
      --experience-type-width: 16.67%;
      --experience-title-width: 45%;
      --experience-isActive-width: 5%;
    }
  }

  @screen l {
    .experience {
      --experience-orgName-width: 27.5%;
      --experience-type-width: 15%;
      --experience-title-width: 35%;
      --experience-period-width: 22.5%;
    }
  }

  @screen sx {
    .experience {
      --experience-orgName-width: 40%;
      --experience-title-width: 60%;
    }
  }

  @screen mx {
    .experience {
      --experience-orgName-width: 33.33%;
      --experience-type-width: 16.67%;
      --experience-title-width: 45%;
      --experience-isActive-width: 5%;
    }
  }

  .experience th[data-col="orgName"] {
    width: var(--experience-orgName-width, inherit);
  }

  .experience th[data-col="type"] {
    width: var(--experience-type-width, inherit);
  }

  .experience th[data-col="title"] {
    width: var(--experience-title-width, inherit);
  }

  .experience th[data-col="isActive"] {
    width: var(--experience-isActive-width, inherit);
  }

  .experience th[data-col="period"] {
    width: var(--experience-period-width, inherit);
  }
</style>
