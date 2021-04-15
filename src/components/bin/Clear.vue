<script>
  import { mapMutations } from 'vuex'

  import bin from '@/mixins/bin'

  export default {
    name: 'Clear',
    command: 'clear',
    description: 'Clear the screen by hiding all previous interactions.',
    mixins: [
      bin,
    ],
    methods: {
      ...mapMutations('terminal', [
        'hideInteractions',
      ]),
    },
    created() {
      this.hideInteractions()
    },
  }
</script>
