<template>
  <div class="seting-box">
    <h3>修改密码</h3>
    <van-form @submit="save">
      <div class="input-item">
        <!-- <van-field v-model="realName" label="姓名" readonly/>
        <van-field v-model="phonenumber" label="登录电话" readonly/> -->
        <van-field v-model="originalPassword" type="password" label="原始密码"  :rules="[{ required: true, message: '请填写原始密码' }]"/>
        <van-field v-model="newPassword" type="password" label="新密码" :rules="[{ required: true, message: '请填写新密码' }]"/>
        <van-field v-model="newPassword1" type="password" label="确认新密码" :rules="[{ required: true, message: '请确认新密码' },{ validator: passwordValidator, message: '两次输入密码不一致' }]"/>
      </div>
      <van-button
        round
        class="save-btn"
        color="#1baeae"
        type="primary"
        native-type="submit"
        block
        >保存</van-button
      >
    </van-form>
    <!-- <van-button
      round
      class="save-btn"
      color="#1baeae"
      type="primary"
      @click="handleLogout"
      block
      >退出登录</van-button
    > -->
  </div>
</template>

<script>
import { getUserInfo, resetPwd } from "@/api/user";
import { setLocal } from "@/common/js/utils";
import { Toast } from "vant";
export default {
  data() {
    return {
      user:{},
      realName: "",
      phonenumber: "",
      originalPassword: "",
      newPassword: "",
      newPassword1: "",
    };
  },
  mounted() {
    (async ()=>{
      const { data:{user} } = await getUserInfo();
      this.realName = user.realName
      this.phonenumber = user.phonenumber
      this.user = user
      console.log(this.user)
    })()
    console.log('mounted')
  },
  methods: {
    passwordValidator(val){
      console.log(this.newPassword,val)
      return this.newPassword === val
    },
    async save() {
      const params = {
        originalPassword: this.originalPassword,
        newPassword: this.newPassword,
        id: this.user.id
      };
      await resetPwd(params);
      localStorage.removeItem('token');
      Toast.success("修改密码成功，请重新登录！");
      alert(localStorage.getItem("token"));
      this.$router.replace({path: '/login'})
    },
    // async handleLogout() {
    //   const { resultCode } = await logout();
    //   if (resultCode == 200) {
    //     setLocal("token", "");
    //     window.location.href = "/";
    //   }
    // },
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
