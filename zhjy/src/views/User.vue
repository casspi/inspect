<template>
  <div class="user-box">
    <van-skeleton title :avatar="true" :row="3" :loading="loading">
      <div class="user-info">
        <div class="info">
          <img src="../assets/user.png" />
          <div class="user-desc">
            <span>昵称：{{ user.nickName }}</span>
            <span>登录名：{{ user.loginName }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
    <ul class="user-list">
      <li class="van-hairline--bottom" @click="goTo('/order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/address', { from: 'mine' })">
        <span>我的患者</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div class="zw"></div>
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/check" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      loading: false,
      user: {
        nickName: "张三",
        loginName: "zhangsan",
      },
    };
  },
  methods: {
    goTo(r, query){
      this.$router.push({ path: r, query: query || {} })
    }
  },
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.user-box {
  overflow: hidden;
  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        text-align: left;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 20px;
    margin-top: 20px;
    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>