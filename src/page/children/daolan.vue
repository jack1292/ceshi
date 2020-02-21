<template>
  <div class="daolan">
    <img src="../../assets/img/beijing.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "daolan",
    created() {
      this.$emit('tabBerSet', 0)
    }
  }
</script>

<style scoped lang="scss">
  .daolan{
    img{
      display: block;
      width: 100%;
    }
  }
</style>