<template>
  <div class="experience text-sol-00 hover:text-sol-1 border-b border-sol-1">
    <ExperienceRow class="font-semibold text-xs uppercase text-sol-1 border-b border-sol-1"/>
    <ExperienceRow
      v-for="(role, roleIndex) in roles"
      :key="roleIndex"
      class="text-lg hover:text-sol-01 hover:bg-sol-2 transition-colors"
      :role="role"
      @click="handleClick(role)"/>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  import ExperienceRow from '@/components/landing/ExperienceRow.vue'

  import { Org } from '@/models/org'

  import orgs from '@/data/experience.json'

  import { breakpoint } from '@/plugins/responsive'

  export default {
    name: 'Experience',
    components: {
      ExperienceRow,
    },
    data() {
      return {
        breakpoint,
        rangeIndicator: '\u2013',
      }
    },
    computed: {
      ...mapGetters('resume', [
        'roles',
      ]),
    },
    methods: {
      populateInput(role) {
        if (this.$store.hasModule('terminal')) {
          this.$store.commit('terminal/setCommandInput', {
            commandInput: `cat ~${role.nodePath}`,
          })
        }
      },
      handleClick(role) {
        this.populateInput(role)
      },
      ...mapMutations('resume', [
        'setOrgs',
      ]),
    },
    mounted() {
      const allOrgs = Org.parse(orgs.children)
      this.setOrgs({
        orgs: allOrgs,
      })
    },
  }
</script>
