<template>
  <div class="past">
    <div
      v-for="(interaction, index) in visibleInteractions"
      :key="index"
      class="interaction mb-ln">
      <Prompt :wd="interaction.context.wd"/>
      {{ interaction.rawInput }}
      <br/>
      <component
        :is="interaction.output.component"
        :argv="interaction.output.argv"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Prompt from '@/components/detail/Prompt.vue'

  import { components } from '@/components/bin/registry'

  export default {
    name: 'Past',
    components: {
      ...components,
      Prompt,
    },
    computed: {
      ...mapState('terminal', [
        'interactionHistory',
      ]),
      visibleInteractions() {
        return this.interactionHistory
          .filter(interaction => interaction.isVisible)
      },
    },
  }
</script>
