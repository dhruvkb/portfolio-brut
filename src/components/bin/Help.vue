<template>
  <div class="help">
    These commands are supported. Hover over them for more info.
    <ul class="command-list">
      <li
        v-for="(binary, command, index) in visibleBins"
        :key="index">
        <Executable
          :bin="command"
          :title="binary.description">
          <span class="text-sol-b ml-ch">
            {{ argsRepr(binary).join(' ') }}
          </span>
        </Executable>
      </li>
    </ul>
  </div>
</template>

<script>
  import Executable from '@/components/detail/Executable.vue'

  import bin from '@/mixins/bin'

  // eslint-disable-next-line import/no-cycle
  import { bins } from '@/components/bin/registry'

  import { allArgs, argRepr } from '@/plugins/binary'

  export default {
    name: 'Help',
    command: 'help',
    description: 'Get help about the terminal.',
    mixins: [
      bin,
    ],
    components: {
      Executable,
    },
    computed: {
      visibleBins() {
        return Object.fromEntries(
          Object.entries(bins)
            .filter(([, item]) => Object.hasOwnProperty.call(item, 'description')),
        )
      },
    },
    methods: {
      argsRepr(binary) {
        return allArgs(binary).map(arg => argRepr(arg))
      },
    },
  }
</script>

<style scoped lang="css">
  .command-list {
    column-count: 2;
  }
</style>
