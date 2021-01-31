<template>
  <div class="detail flex flex-col items-center justify-center bg-black min-h-full p-4 border-g tp:border-l tp:border-grey">
    <div class="circle bg-white rounded-full opacity-10"></div>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
  }
</script>

<style scoped lang="css">
  .circle {
    width: calc(min(50vw, 100vh) - 64px);
    height: calc(min(50vw, 100vh) - 64px);
  }
</style>
