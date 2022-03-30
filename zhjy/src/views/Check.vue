<template>
  <div class="home" ref="home">
    <van-tree-select
      height="100%"
      :active-id.sync="activeIds"
      :items="checkItems"
      :main-active-index.sync="activeIndex"
      @click-item="itemClickHandler"
    />
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <!-- <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item> -->
      <van-tabbar-item replace to="/" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { wxLogin, wxCallback, getPrompt } from '@/api/index'
import { getCheckList } from '../api/index'
import { mapGetters, mapActions } from 'vuex'
export default { 
  name: 'Home',
  components: {
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      activeIndex: 0,
      scHeight: '100%',
      checkItems: [
        
      ],
      activeIds: [],
      code:''
    }
  },
  mounted() {
    this.getCheckList()
    console.log(this.userInfo)
    if(this.userInfo && this.userInfo.userId && !this.userInfo.openid){
      this.getPromptHandler();
      this.WXgetCode();
    }
    this.$nextTick(()=>{
      // console.log(window.screen.height,window.screen.availHeight)
      // console.log(this.$refs.home.querySelector('.van-tabbar').offsetHeight)
      this.scHeight = (window.screen.availHeight - this.$refs.home.querySelector('.van-tabbar').offsetHeight) + 'px';
    })
  },
  methods: {
    ...mapActions(['updateUserInfo']),
    async getPromptHandler() {
      const promptMsg = await getPrompt()
      this.$dialog.alert({
        title: promptMsg.data.noticeTitle,
        message: promptMsg.data.noticeContent,
      }).then(() => {
        // on close
      });
    },
    async WXgetCode() {
      // 静默授权
      this.code = "";
    
      this.code = this.getUrlCode().code; // 截取code
      if (this.code == null || this.code === ""|| this.code === undefined|| this.code === 'undefined') {
        // 如果没有code，则去请求
        let {data} = await wxLogin()
        if(data){
          window.location.href = data
        }
      } else {
        this.WXgetOpenId()
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search;
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      }
      return theRequest;
    },
    async WXgetOpenId() {
      const {code} = this
      const data = await wxCallback({ code })
      console.log(data)
      //更新userInfo
      this.updateUserInfo()
      console.log(this.userInfo)
    },
    //获取检查项目
    async getCheckList(){
      const {data} = await getCheckList()
      this.checkItems = JSON.parse(JSON.stringify(data).replace(/itemName/g,'text').replace(/itemList/g,'children'))
    },
    itemClickHandler(data){
      if(!localStorage.getItem('token')){
        this.$toast.fail("请先登录！")
        this.$router.push({path:'/login'})
        return
      }
      if(!this.activeIds.includes(data.id)){//不含说明是取消选中
        this.$toast('已取消');
        return
      }
      let selectItems = []
      this.checkItems.map(item=>{
        selectItems = selectItems.concat(item.children.filter(o => this.activeIds.includes(o.id)))
      })
      this.$dialog.confirm({
        confirmButtonText:'去支付',
        cancelButtonText:'继续选择',
        title: '温馨提示',
        message: `您选择了【${data.text}】,您可以继续添加项目或者去支付！`,
      })
      .then(() => {
        console.log(selectItems)
        this.$router.push({path: 'create-order', query: { selectItems:JSON.stringify(selectItems) }})
      })
      .catch(() => {
        // this.activeIds = ''
        // this.$toast('已取消');
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
    /deep/ .van-tree-select__item {
      border-bottom: 1px solid #eee;
    }
    .home{
      width: 100%;
      padding-bottom: 50px;
    }
</style>
