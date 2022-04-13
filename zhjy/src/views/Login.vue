<template>
  <div class="login">
    <h3>{{ type !== "login" ? "注册" : "登录" }}</h3>
    <div v-if="type == 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phoneNum1"
          name="phoneNum1"
          label="手机号"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { validator: phoneValidator, message: '请输入正确的手机号' },
          ]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#1baeae" native-type="submit"
            >登录</van-button>
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="phoneNum2"
          name="phoneNum2"
          label="手机号"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { validator: phoneValidator, message: '请输入正确的手机号' },
          ]"
        />
        <van-field
          v-model="password2"
          type="password"
          name="password2"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="realName"
          name="realName"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="idNumber"
          name="idNumber"
          label="身份证号码"
          placeholder="身份证号码"
          :rules="[
            { validator: iuNumValidator, message: '请填写正确的身份证号码' },
          ]"
        />
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="sex" direction="horizontal" disabled>
              <van-radio name="0" readonly>男</van-radio>
              <van-radio name="1" readonly>女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="age"
          type="number"
          name="age"
          label="年龄"
          placeholder="年龄"
          readonly
        />
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#1baeae" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
import { wxLogin, getPrompt } from '@/api/index'
import { setLocal, idnumberValidator } from "@/common/js/utils";
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      password1: "",
      password2: "",
      phoneNum1: "",
      phoneNum2: "",
      type: "login",
      imgCode: "",
      realName: "",
      idNumber: "",
      sex: "",
      age: "",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  watch: {
    idNumber: function (val) {
      if (idnumberValidator(val)) {
        this.setAgeAndsex(val);
      } else {
        this.sex = "";
        this.age = "";
      }
    },
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    phoneValidator(val) {
      return /^[1](([3|5|8][\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\d]{8}$/.test(
        val
      );
    },
    iuNumValidator(val) {
      return idnumberValidator(val);
    },
    setAgeAndsex(value) {
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = myDate.getFullYear() - value.substring(6, 10) - 1;
      if (
        value.substring(10, 12) < month ||
        (value.substring(10, 12) == month && value.substring(12, 14) <= day)
      ) {
        age++;
      }
      this.age = age;
      this.sex = parseInt(value.substr(16, 1)) % 2 == 1 ? "0" : "1";
    },
    // 切换登录和注册两种模式
    toggle(v) {
      this.type = v;
    },
    async onSubmit(values) {
      if (this.type == "login") {
        // try {
        const { data } = await login({
          password: values.password1,
          username: values.phoneNum1,
          code: "",
          uuid: "",
        });
        console.log(data);
        let token = "Bearer " + data.token;
        await setLocal("token", token);
        await setLocal("userType", data.userType);
        this.setUserInfo(data);
          this.getPromptHandler();
          this.WXgetCode();
      } else {
        let { age, idNumber, realName, sex } = this;
        try {
          await register({
            phonenumber: this.phoneNum2,
            password: this.password2,
            age: Number(age),
            idNumber,
            realName,
            sex,
          });
          Toast.success("注册成功");
          this.type = "login";
        } catch (error) {
          console.log(error);
          Toast.fail(error.msg);
        }
      }
    },
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
          // 如果没有code，则去请求
          let {data} = await wxLogin()
          if(data){
              window.location.href = data
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
.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 20px;
  }
  .login-body {
    padding: 0 20px;
  }
  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }
  .verify-bar-area {
    margin-top: 24px;
    .verify-left-bar {
      border-color: #1baeae;
    }
    .verify-move-block {
      background-color: #1baeae;
      color: #fff;
    }
  }
  .verify {
    > div {
      width: 100%;
    }
    display: flex;
    justify-content: center;
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      float: left !important;
    }
    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>
