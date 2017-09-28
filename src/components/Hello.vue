<template>
  <div  class="test">
       <Auth></Auth>
  </div>
</template>

<script>
  import Auth  from './public/AskPrice.vue'
  export default {
    name: 'app',
    created:function () {
      //this.$store.commit("upstate",{"msg":"test"})
    },
    components:{Auth}
  }
</script>

<style scoped>
.test{
  width:1280px;
  height:720px;
  background-color:#fff;
}
</style>
