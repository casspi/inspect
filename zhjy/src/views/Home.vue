<template>
  <div class="home" ref="home">
    index
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/check" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  mounted() {
    // function getInfo(){

    //   var s = "";  

    //   s += " 网页可见区域宽："+ document.body.clientWidth+"\n";   

    //   s += " 网页可见区域高："+ document.body.clientHeight+"\n"; 

    //   s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";    

    //   s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";   

    //   s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";   

    //   s += " 网页正文全文高："+ document.body.scrollHeight+"\n";   

    //   s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";   

    //   s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";   

    //   s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";   

    //   s += " 网页正文部分上："+ window.screenTop+"\n";   

    //   s += " 网页正文部分左："+ window.screenLeft+"\n";   

    //   s += " 屏幕分辨率的高："+ window.screen.height+"\n";   

    //   s += " 屏幕分辨率的宽："+ window.screen.width+"\n";   

    //   s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";   

    //   s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";   

    //   s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";   

    //   s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";   

    //   alert (s);

    // }

    // getInfo();
    this.$nextTick(()=>{
      console.log(window.screen.height,window.screen.availHeight)
      console.log(this.$refs.home.querySelector('.van-tabbar').offsetHeight)
      this.scHeight = (window.screen.availHeight - this.$refs.home.querySelector('.van-tabbar').offsetHeight) + 'px';
    })
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>
<style lang="less" scoped>
    @import "../common/style/mixin";
   
</style>
