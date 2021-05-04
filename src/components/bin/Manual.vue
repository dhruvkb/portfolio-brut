<template>
  <div class="manual">
    <p class="mb-ln">
      <strong>NAME:</strong><br/>
      <span class="ml-indent">{{ binary.command }} -- {{ binary.description }}</span>
    </p>
    <p class="my-ln">
      <strong>SYNOPSIS:</strong><br/>
      <Executable
        class="ml-indent"
        :bin="binary.command"
        enable-exec>
        <span class="text-sol-b ml-ch">
          {{ argsRepr.join(' ') }}
        </span>
      </Executable>
    </p>
    <p class="my-ln">
      <strong>DESCRIPTION:</strong><br/>
      <span class="ml-indent">The following options are available:</span>
    </p>
    <ul class="ml-indent">
      <li
        v-for="(arg, index) in allArgs(binary)"
        :key="index">
        <span class="text-sol-b">{{ alignedArg(arg) }}</span> -- {{ arg.description }}
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
    name: 'Manual',
    command: 'man',
    description: 'Get information about any command.',
    argSpec: {
      posArgs: [
        {
          name: 'bin',
          description: 'the name of the binary to get help about',
        },
      ],
    },
    mixins: [
      bin,
    ],
    components: {
      Executable,
    },
    data() {
      return {
        space: '\xa0',
      }
    },
    computed: {
      binary() {
        return bins[this.args.bin]
      },
      argsRepr() {
        return allArgs(this.binary).map(arg => argRepr(arg))
      },
    },
    methods: {
      allArgs,
      alignedArg(arg) {
        return argRepr(arg).padStart(16, this.space)
      },
    },
  }
</script>
