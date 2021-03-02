<template>
  <span>{{ face }}ﾉ</span>
</template>

<script>
  import sample from 'lodash/sample'

  export default {
    name: 'Kaomoji',
    data() {
      return {
        edgesList: [
          ['(', ')'],
        ],
        eyesList: [
          ['ˇ', 'ˇ'],
          ['❛', '❛'],
          ['^', '^'],
          ['＾', '＾'],
          ['´•', '•`'],
          ['◕', '◕'],
        ],
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
      face() {
        const [edgeLeft, edgeRight] = sample(this.edgesList)
        const [eyeLeft, eyeRight] = sample(this.eyesList)
        const mouth = sample(this.mouthList)

        return [
          edgeLeft,
          eyeLeft,
          mouth,
          eyeRight,
          edgeRight,
        ].join(' ')
      },
    },
  }
</script>
