<template>
  <div class="seting-box">
    <h3>修改密码</h3>
    <div class="input-item">
      <van-field v-model="realName" label="姓名" readonly/>
      <van-field v-model="phonenumber" label="登录电话" readonly/>
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button
      round
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="save"
      block
      >保存</van-button
    >
    <van-button
      round
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="handleLogout"
      block
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import { setLocal } from "@/common/js/utils";
import { Toast } from "vant";
export default {
  data() {
    return {
      realName: "",
      phonenumber: "",
      password: "",
    };
  },
  mounted() {
    (async ()=>{
      const { data:{user} } = await getUserInfo();
      this.realName = user.realName
      this.phonenumber = user.phonenumber
    })()
    console.log('mounted')
  },
  methods: {
    async save() {
      const params = {
        phonenumber: this.phonenumber,
        realName: this.realName,
        password:this.password
      };
      await EditUserInfo(params);
      Toast.success("保存成功");
    },
    async handleLogout() {
      const { resultCode } = await logout();
      if (resultCode == 200) {
        setLocal("token", "");
        window.location.href = "/";
      }
    },
  },
};
</script>

<style lang="less" scoped>
h3 {
  font-size: 20px;
  text-align: center;
}
.seting-box {
  .save-btn {
    width: 80%;
    margin: 20px auto;
  }
}
</style>
