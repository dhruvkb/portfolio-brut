<template>
  <div class="experience text-sol-00 hover:text-sol-1 s:border-b s:border-sol-1">
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
      class="experiences grid text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors z:border-b s:border-none border-sol-1"
      role="button"
      tabindex="0">
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="resume-cell"
        :style="{ gridArea: column.fieldName }">
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
        const title = {
          fieldName: 'title',
          displayName: 'Role',
        }
        const isActive = {
          fieldName: 'isActive',
          displayName: '',
        }
        const periodText = {
          fieldName: 'periodText',
          displayName: 'Period',
        }

        let columns
        switch (breakpoint.name) {
          case 's':
          case 'sx':
            columns = [orgName, title]
            break
          case 'm':
          case 'mx':
            columns = [orgName, type, title, isActive]
            break
          case 'l':
            columns = [orgName, type, title, periodText]
            break
          default: // z
            columns = [orgName, type, title]
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
    @screen z {
      --experiences-cols: 60% 40%;
      grid-template-rows: repeat(2, auto);
      grid-template-areas: "orgName type" "title title";
    }
    @screen s {
      --experiences-cols: 40% 60%;
      grid-template-areas: "orgName title";
    }
    @screen m {
      --experiences-cols: 33.33% 16.67% 45% 5%;
      grid-template-areas: "orgName type title isActive";
    }
    @screen l {
      --experiences-cols: 27.5% 15% 35% 22.5%;
      grid-template-areas: "orgName type title periodText";
    }
    @screen sx {
      --experiences-cols: 40% 60%;
      grid-template-areas: "orgName title";
    }
    @screen mx {
      --experiences-cols: 33.33% 16.67% 45% 5%;
      grid-template-areas: "orgName type title isActive";
    }

    grid-template-columns: var(--experiences-cols);
  }
</style>
