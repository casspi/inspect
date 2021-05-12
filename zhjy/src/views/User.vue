<template>
  <div class="user-box">
    <van-skeleton title :avatar="true" :row="3" :loading="loading">
      <div class="user-info">
        <div class="info">
          <img v-if="user.sex==='女'" src="../assets/women.png" />
          <img v-else src="../assets/men.png" />
          <div class="user-desc">
            <span>个人信息：{{ user.realName }} {{ user.sex==="0"?'男':'女' }} {{ user.age }}岁</span>
            <span>登录手机：{{ user.userName }}</span>
            <!-- <span>性别：{{ user.sex }}</span>
            <span>年龄：{{ user.age }}</span> -->
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
      <template v-if="user.userType==='3'">
        <li class="van-hairline--bottom" @click="goTo('/recommend', { from: 'mine' })">
          <span>我的推荐</span>
          <van-icon name="arrow" />
        </li>
        <li class="van-hairline--bottom" @click="openQrcode">
          <span>我的二维码</span>
          <van-icon name="scan" />
        </li>
      </template>
      <li class="van-hairline--bottom" v-else @click="goTo('/patient', { from: 'mine' })">
        <span>我的就诊人</span>
        <van-icon name="arrow" />
      </li>
       <li class="van-hairline--bottom" @click="goTo('/about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
    <van-dialog v-model="showQrcode" title="我的推荐码">
      <img :src="qrcodeSrc" />
    </van-dialog>
    <div class="zw"></div>
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getUserInfo } from '../api/user'
import axios from 'axios'
export default {
  name: "User",
  data() {
    return {
      loading: false,
      user: {
      },
      qrcodeSrc:'',
      showQrcode:false
    };
  },
  mounted() {
    this.getUserInfoFn()
  },
  methods: {
    async getUserInfoFn(){
     const { data } =  await getUserInfo()
     this.user = data.user
    },
    goTo(r, query){
      this.$router.push({ path: r, query: query || {} })
    },
    //打开二维码
    async openQrcode() {
      let that = this
      let url = 'http://121.37.185.29:12021/hospital/doctor/qrCode/1391238665749004288'
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'
      xhr.onload = function(e) {
          let buffer = xhr.response
          let binary = '';
          let bytes = new Uint8Array(buffer);
          let len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
         
          that.qrcodeSrc = 'data:image/jpeg;base64,' +  window.btoa(binary)
          // console.log(that.qrcodeSrc='https://static.oschina.net/uploads/img/201707/27161839_KziE.jpg')
      };
      xhr.send()
      this.showQrcode = true
      // axios.get('http://121.37.185.29:12021/hospital/doctor/qrCode/1391238665749004288', {
      //     // responseType: "arraybuffer",//这里是声明期望返回的数据类型
      //     responseType: "blob",
      // }).then(function (response) {
      //     //将从后台获取的图片流进行转换
      //     return 'data:image/jpeg;base64,' + btoa(
      //         new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      //     );
      // }).then(function (data) {
      //     //接收转换后的Base64图片
      //     console.log(data);
      //     this.qrcode = data
      // }).catch(function (error) {
      //     // this.$message.error(error);
      // })
      // const data = await getQrcode2({id: this.user.id})
      // console.log(data)
      // this.qrcode = data.data
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
      .van-icon-arrow, .van-icon-scan {
        margin-top: 13px;
      }
    }
  }
  .van-dialog img{
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
}
</style>