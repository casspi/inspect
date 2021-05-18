<template>
  <div class="home" ref="home">
    <header>
      <h4>学术资讯</h4>
    </header>

    <van-swipe class="my-swipe" :autoplay="5000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-pull-refresh
      class="patient-list"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="article-item" v-for="article in list" :key="article"> 
          <div class="left">
            <p><i>{{article + '.'}}</i>211212121</p>
            <span class="time">2021年4月23日 12:00:08</span>
          </div>
          <img src="../assets/xm/xm01.jpg" alt="" />
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="block"></div>
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <!-- <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item> -->
      <van-tabbar-item replace to="/" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'

export default {
  name: "Home",
  components: {},
  computed:{
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    // console.log(this.userInfo)
    // if(!this.userInfo.openid){
    //   this.WXgetCode()
    // }
  },
  data() {
    return {
      images: [
        require("../assets/xm/xm03.jpg"),
        require("../assets/xm/xm04.jpg"),
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  h4 {
    font-weight: 500;
    font-size: 21px;
    color: #000;
    padding: 0 20px;
  }
  .my-swipe {
    .van-swipe-item {
      height: 150px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-item {
    padding: 10px 20px 8px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .time{
        color: #ccc;
      }
    }
    img {
      margin-left: 20px;
      width: 100px;
      height: 75px;
    }
  }
  .block {
    height: 50px;
  }
}
</style>
