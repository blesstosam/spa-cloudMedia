<template>
  <div id="app">
    <router-view></router-view>
    <div class="links">
      <router-link to="/sd/home/movie">电影</router-link>
      <router-link to="/sd/home/tv">电视剧</router-link>
      <router-link to="/sd/home/animation">动漫</router-link>
      <router-link to="/sd/home/hot/list">点播推荐</router-link>

      <router-link to="/sd/home/sports/s2">体育</router-link>
      <router-link to="/sd/home/news/s2">新闻</router-link>
      <router-link to="/sd/home/arts/s2">综艺</router-link>
      <router-link to="/sd/home/culture/s2">文化</router-link>
      <router-link to="/sd/home/culture/s2">生活</router-link>
      <router-link to="/vod/home/">点播导航</router-link>

      <router-link to="/hd/home">高清推荐-大首页</router-link>
      <router-link to="/hd/movie">高清-电影</router-link>
    </div>


  </div>
</template>

<script>

  export default {
    name: 'app',
    created: function () {
      //this.$store.commit("upstate",{"msg":"test"})
    }
  }
</script>

<style>
  .links {
    margin: 140px;
  }

  .links a {
    display: block;
  }
</style>
