<template>
  <div class="home" ref="home">
    <van-tree-select
      height="100%"
      :active-id.sync="activeIds"
      :items="checkItems"
      :main-active-index.sync="activeIndex"
      @click-item="itemClickHandler"
    />
      <van-badge :content="activeIds.length" max="10" class="pay-btn">
        <van-button type="info" icon="cart-o" color="rgb(27, 174, 174)" @click="handlePay"></van-button>
      </van-badge>
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <!-- <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item> -->
      <van-tabbar-item replace to="/" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import { wxCallback, getCheckList } from '@/api/index'
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
    }
  },
  async mounted() {
      await  this.WXgetOpenId();
      this.getCheckList()
    this.$nextTick(()=>{
      // console.log(window.screen.height,window.screen.availHeight)
      // console.log(this.$refs.home.querySelector('.van-tabbar').offsetHeight)
      this.scHeight = (window.screen.availHeight - this.$refs.home.querySelector('.van-tabbar').offsetHeight) + 'px';
    })
  },
  methods: {
      ...mapActions(['updateUserInfo']),
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
    },
      handlePay() {
          let selectItems = []
          this.checkItems.map(item=>{
              selectItems = selectItems.concat(item.children.filter(o => this.activeIds.includes(o.id)))
          })
          if(!selectItems.length){
              this.$toast('请选择检查项目')
              return
          }
          console.log(selectItems)
          let selectItemsText = ''
          selectItems.forEach(item => {
              selectItemsText += `【${item.text}】`
          })
          this.$dialog.confirm({
              title: '温馨提示',
              confirmButtonText:'去支付',
              cancelButtonText:'继续选择',
              message: `您选择了${selectItemsText},您可以继续添加项目或者去支付！`,
          })
          .then(() => {
              console.log(selectItems)
              this.$router.push({path: 'create-order', query: { selectItems:JSON.stringify(selectItems) }})
          })
          .catch(() => {
              // this.activeIds = ''
              // this.$toast('已取消');
          });
      },
      async WXgetOpenId() {
          let { code } = this.getUrlCode();
          if(code){
              const data = await wxCallback({ code })
              console.log(data)
              //更新userInfo
              this.updateUserInfo()
              location.search = ''
              console.log(this.userInfo)
          }
      },
      getUrlCode() {
          // 截取url中的code方法
          let url = location.search;
          let theRequest = new Object();
          if (url.indexOf("?") != -1) {
              let str = url.substr(1);
              let strs = str.split("&");
              for (let i = 0; i < strs.length; i++) {
                  theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
              }
          }
          return theRequest;
      },
      getQueryString(name) {
          // 截取url中的code方法
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
      },
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
    .pay-btn{
        position: fixed;
        right: 20px;
        bottom: 70px;
    }
</style>
