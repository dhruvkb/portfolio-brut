<template>
  <div class="whoami">
    <template v-if="args.groot">groot</template>
    <template v-else>guest</template>
  </div>
</template>

<script>
  import bin from '@/mixins/bin'

  export default {
    name: 'WhoAmI',
    command: 'whoami',
    description: 'Display the name of the current active user',
    argSpec: {
      kwArgs: [
        {
          name: 'groot',
          aliases: ['g'],
          type: Boolean,
          description: 'whether to run the command in Groot mode',
        },
      ],
    },
    mixins: [
      bin,
    ],
  }
</script>
