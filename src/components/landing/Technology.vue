<template>
  <div class="technology inline-flex flex-row items-center gap-2 first:ml-0 ml-2">
    <Icon :paths="paths"/>{{ name }}
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'

  import Icon from '@/components/landing/Icon.vue'

  import simpleIcons from 'simple-icons'
  import django from 'simple-icons/icons/django'
  import docker from 'simple-icons/icons/docker'
  import gnubash from 'simple-icons/icons/gnubash'
  import javascript from 'simple-icons/icons/javascript'
  import latex from 'simple-icons/icons/latex'
  import nuxtdotjs from 'simple-icons/icons/nuxtdotjs'
  import python from 'simple-icons/icons/python'
  import readthedocs from 'simple-icons/icons/readthedocs'
  import tailwindcss from 'simple-icons/icons/tailwindcss'
  import typescript from 'simple-icons/icons/typescript'
  import vuedotjs from 'simple-icons/icons/vuedotjs'

  export default defineComponent({
    name: 'Technology',
    components: {
      Icon,
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
    },
    setup(props) {
      const icons: Record<string, simpleIcons.SimpleIcon> = {
          django,
          docker,
          gnubash,
          javascript,
          latex,
          nuxtdotjs,
          python,
          readthedocs,
          tailwindcss,
          typescript,
          vuedotjs,
      }
      const paths = computed(() => {
        const icon = icons[props.icon]
        return [
          {
            d: icon.path,
            'fill-rule': 'nonzero',
          },
        ]
      })

      return {
        paths,
      }
    },
  })
</script>
