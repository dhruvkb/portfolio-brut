<template>
  <div class="spinner">
    {{ spinnerStrings[index] }}
  </div>
</template>

<script>
  export default {
    name: 'Spinner',
    data() {
      return {
        spinnerStrings: [
          '⡇⠀', '⠏⠀', '⠋⠁', '⠉⠉', '⠈⠙', '⠀⠹',
          '⠀⢸', '⠀⣰', '⢀⣠', '⣀⣀', '⣄⡀', '⣆⠀',
        ],
        index: 0,
        interval: 0.05,
        updateLooper: null,
      }
    },
    methods: {
      startLooping() {
        this.updateLooper = setInterval(() => {
          this.index = (this.index + 1) % this.spinnerStrings.length
        }, this.interval * 1000)
      },
      stopLooping() {
        clearInterval(this.updateLooper)
      },
    },
    created() {
      this.startLooping()
    },
    beforeUnmount() {
      this.stopLooping()
    },
  }
</script>

<style scoped lang="css">
  .spinner {
    letter-spacing: -2px; /* to join the two Braille letters */
  }
</style>
