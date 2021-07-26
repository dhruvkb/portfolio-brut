<template>
  <div class="experience text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <ExperienceRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <ExperienceRow
      v-for="(role, roleIndex) in roles"
      :key="roleIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :class="[...role.isLast ? ['border-b', 'border-sol-2'] : []]"
      :role="role"
      @click="populateInput(role)"/>
  </div>
</template>

<script lang="ts">
  import type { Role } from '@/models/role'

  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { useSeeelaye } from 'seeelaye'

  import ExperienceRow from '@/components/landing/ExperienceRow.vue'

  export default defineComponent({
    name: 'Experience',
    components: {
      ExperienceRow,
    },
    setup() {
      const store = useStore()
      const router = useRouter()
      const seeelaye = useSeeelaye()

      const roles = computed(() => store.getters['resume/roles'])

      const populateInput = (role: Role) => {
        if (store.state.ui.isProMode) {
          seeelaye.commit('setInput', {
            input: `cat ~${role.nodePath}`,
          })
        } else {
          router.push({ path: role.nodePath })
        }
      }

      return {
        roles,
        populateInput,
      }
    },
  })
</script>
