<template>
  <div class="bad">
    Command <strong>{{ args.bin }}</strong> does not exist in the CLI. Try
    <Executable bin="help"/>.
  </div>
</template>

<script>
  import Executable from '@/components/detail/Executable.vue'

  import bin from '@/mixins/bin'

  export default {
    name: 'Bad',
    description: 'Point out commands that do not exists and redirect to help',
    argSpec: {
      kwArgs: [
        {
          name: 'bin',
          type: String,
        },
      ],
    },
    mixins: [
      bin,
    ],
    components: {
      Executable,
    },
  }
</script>
