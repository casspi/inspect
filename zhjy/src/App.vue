<template>
  <div id="app">
      <transition v-if="$helper.isDev() || $helper.isWeiXin()">
          <router-view class="router-view" />
      </transition>
      <van-empty v-else description="请访问微信公众号【医检大师】"></van-empty>
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
html, body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

.router-view{
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
    height: 100%;
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    backface-visibility: hidden;
}
.slide-right-enter{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
  z-index: 1000;
}
</style>
