<template>
  <div id="app">
    <!-- <div id="nav">

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <transition>
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    function initRem() {
      let cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375
      window.document.documentElement.style.fontSize = `${37.5 * cale}px`
    }
    initRem()
    window.addEventListener('resize', function() {
      initRem()
    })
  },
}
</script>
<style lang="less">
// html,body{
//   height: 100%;
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // height: 100%;
  width: 100%;
}
</style>
