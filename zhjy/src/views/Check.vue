<template>
  <div class="home" ref="home">
    <van-tree-select
      height="100%"
      :active-id.sync="activeIds"
      :items="items"
      :main-active-index.sync="activeIndex"
      @click-item="itemClickHandler"
    />
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
      activeIndex: 0,
      scHeight: '100%',
      items: [
        { text: '肿瘤', 
          children: [
            {id: 1,text:'肿瘤检查1'},
            {id: 2,text:'肿瘤检查2'},
            {id: 3,text:'肿瘤检查3'},
            {id: 4,text:'肿瘤检查4'},
            {id: 5,text:'肿瘤检查5'},
            {id: 6,text:'肿瘤检查6'},
            {id: 7,text:'肿瘤检查7'},
            {id: 8,text:'肿瘤检查8'},
            {id: 9,text:'肿瘤检查9'},
            {text:'肿瘤检查1'},
            {text:'肿瘤检查2'},
            {text:'肿瘤检查3'},
            {text:'肿瘤检查4'},
            {text:'肿瘤检查5'},
            {text:'肿瘤检查6'},
            {text:'肿瘤检查7'},
            {text:'肿瘤检查8'},
            {text:'肿瘤检查9'}
          ], 
          // dot: true 
        },
        { text: '妇科', 
          children: [
            {id: 21, text:'妇科检查1'},
            {id: 22, text:'妇科检查2'},
            {id: 23, text:'妇科检查3'},
            {id: 24, text:'妇科检查4'},
            {id: 25, text:'妇科检查5'},
            {id: 26, text:'妇科检查6'},
          ], 
          // badge: 5 
        }
      ],
      activeIds: '',
    }
  },
  methods: {
    itemClickHandler(data){
      let id = data.id
      let testsName = data.text
      this.$dialog.confirm({
        title: '温馨提示',
        message: `您选择了【${data.text}】,请确认是否继续？`,
      })
      .then(() => {
        this.$router.push({path: 'create-order', query: { id, testsName }})
      })
      .catch(() => {
        this.activeIds = ''
        this.$toast('已取消');
      });
    }
  },
}
</script>
<style lang="less" scoped>
    @import "../common/style/mixin";
    /deep/ .van-sidebar-item--select::before{
        background-color: @primary!important;
    }
    /deep/ .van-tree-select__item--active{
        color: @primary!important;
    }
    .home{
      width: 100%;
      padding-bottom: 50px;
    }
</style>
