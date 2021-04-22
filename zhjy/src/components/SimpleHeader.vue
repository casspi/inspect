<template>
    <div>
    <header class="simple-header van-hairline--bottom">
        <i v-if="!noback" class="nbicon nbfanhui" @click="goBack"></i>
        <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
        <div class="simple-header-name">{{ name }}</div>
        <i class="nbicon nbmore"></i>
    </header>
    <div class="block" ></div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        name: {
            type: String,
            default: ''
        },
        back: {
            type: String,
            default: ''
        },
        noback: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        goBack(){
            console.log(this)
            if (!this.back) {
                this.$router.go(-1)
            } else {
                this.$router.push({ path: this.back })
            }
            this.$emit('callback')
        }
    }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    .simple-header-name {
      font-size: 14px;
    }
  }
  .block {
    height: 44px;
  }
</style>