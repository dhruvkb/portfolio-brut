<template>
  <div class="experience text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <ExperienceRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <ExperienceRow
      v-for="(role, roleIndex) in roles"
      :key="roleIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :class="[...role.isLast ? ['border-b', 'border-sol-2'] : []]"
      :role="role"
      @click="handleClick(role)"/>
  </div>
</template>

<script lang="ts">
  import type { Role } from '@/models/role'

  import { defineComponent } from 'vue'
  import { mapGetters } from 'vuex'

  import ExperienceRow from '@/components/landing/ExperienceRow.vue'

  export default defineComponent({
    name: 'Experience',
    components: {
      ExperienceRow,
    },
    computed: {
      ...mapGetters('resume', [
        'roles',
      ]),
    },
    methods: {
      populateInput(role: Role): void {
        if (this.$store.hasModule('terminal')) {
          this.$seeelaye.commit('setInput', {
            input: `cat ~${role.nodePath}`,
          })
        }
      },
      handleClick(role: Role): void {
        this.populateInput(role)
      },
    },
  })
</script>
