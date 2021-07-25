<template>
  <span>{{ face }}ﾉ</span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import sample from 'lodash/sample'

  export default defineComponent({
    name: 'Kaomoji',
    data() {
      return {
        edgesList: [
          ['(', ')'],
        ] as [string, string][],
        eyesList: [
          ['ˇ', 'ˇ'],
          ['❛', '❛'],
          ['^', '^'],
          ['＾', '＾'],
          ['´•', '•`'],
          ['◕', '◕'],
        ] as [string, string][],
        mouthList: [
          '◡',
          'ᴗ',
          'ᵕ',
          '▽',
          'ヮ',
          '*',
        ],
      }
    },
    computed: {
      face(): string {
        const [edgeLeft, edgeRight] = sample(this.edgesList) ?? ['', '']
        const [eyeLeft, eyeRight] = sample(this.eyesList) ?? ['', '']
        const mouth = sample(this.mouthList) ?? ''

        return [
          edgeLeft,
          eyeLeft,
          mouth,
          eyeRight,
          edgeRight,
        ].join(' ')
      },
    },
  })
</script>
