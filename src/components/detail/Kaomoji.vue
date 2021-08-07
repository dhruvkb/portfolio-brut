<template>
  <span>{{ face }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import sample from 'lodash/sample'

  export default defineComponent({
    name: 'Kaomoji',
    props: {
      mood: {
        type: String,
        validator: (val: string) => ['happy', 'confused'].includes(val),
        default: 'happy',
      },
    },
    setup(props) {
      const edgePairs: [string, string][] = [
        ['(', ')'],
      ]
      let eyePairs: [string, string][]
      let mouths: string[]
      let hands: string[]
      switch (props.mood) {
        case 'happy':
          eyePairs = [
            ['ˇ', 'ˇ'],
            ['❛', '❛'],
            ['^', '^'],
            ['＾', '＾'],
            ['´•', '•`'],
            ['◕', '◕'],
          ]
          mouths = ['◡', 'ᴗ', 'ᵕ', '▽', 'ヮ', '*']
          hands = ['ﾉ', 'ノ', 'ﾉﾟ', '◞*']
          break
        case 'confused':
          eyePairs = [
            ['・', '・'],
            ['-', '-'],
            ['｀', '´'],
            ['৺ੋ', '৺ੋ'],
            ['-᷅', '-᷄๑'],
            ['﹒︠', '﹒︡'],
          ]
          mouths = ['_', 'д', '∧', '௦', '₋']
          hands = ['ヾ', 'ゞ゛', 'ゞ']
          break
        default:
          eyePairs = []
          mouths = []
          hands = []
      }

      const face = computed(() => {
        const [edgeLeft, edgeRight] = sample(edgePairs) ?? ['', '']
        const [eyeLeft, eyeRight] = sample(eyePairs) ?? ['', '']
        const mouth = sample(mouths) ?? ''
        const hand = sample(hands) ?? ''

        return [edgeLeft, eyeLeft, mouth, eyeRight, edgeRight, hand].join('')
      })

      return {
        face,
      }
    },
  })
</script>
