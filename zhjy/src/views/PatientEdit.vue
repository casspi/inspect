<template>
  <div class="patient-edit">
    <van-form @submit="onSubmit">
      <van-field
        v-model="realName"
        name="realName"
        label="姓名"
        placeholder="就诊人姓名"
        :rules="[{ required: true, message: '请填写就诊人姓名' }]"
      />
      <van-field
          v-model="phonenumber"
          name="phonenumber"
          label="手机号"
          placeholder="手机号"
          :rules="[
            { required: true, message: '请填写手机号' },
            { validator: phoneValidator, message: '请输入正确的手机号' },
          ]"
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
      <van-field name="sex" label="性别">
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
        <!-- <div class="link-login" @click="toggle('login')">已有登录账号</div> -->
        <van-button round block color="#1baeae" native-type="submit">确定</van-button>
        <van-button v-if="editItem.id" round block class="del-btn" native-type="button" @click="delPatinetHandler">删除</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { addPatient, delPatient, updatePatinet } from "@/api/patient";
import { idnumberValidator } from "@/common/js/utils";
// import md5 from "js-md5";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      editItem: {},
      realName: "",
      idNumber: "",
      sex: "",
      age: "",
      phonenumber:''
    };
  },
  computed: {},
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
  mounted() {
    console.log(this.$route)
    this.editItem = this.$route.query
    this.realName = this.editItem.realName || ''
    this.idNumber = this.editItem.idNumber || ''
    this.phonenumber = this.editItem.phonenumber || ''
    // this.sex = this.editItem.sex
  },
  methods: {
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
      console.log(age);
      this.age = age;
      this.sex = parseInt(value.substr(16, 1)) % 2 == 1 ? "0" : "1";
    },
    async onSubmit(values) {
      console.log(values);
      const { idNumber, realName, sex, age, phonenumber} = values;
      if(this.editItem.id){//修改就诊人信息
        await updatePatinet({
          id:this.editItem.id,
          phonenumber,
          age: Number(age),
          idNumber,
          realName,
          sex,
        });
        Toast.success("修改就诊人成功");
        this.$router.back()
      }else{//新增
        await addPatient({
          phonenumber,
          age: Number(age),
          idNumber,
          realName,
          sex,
        });
        Toast.success("新增就诊人成功");
        this.$router.back()
      }
    },
    delPatinetHandler(){
      this.$dialog.confirm({
        title: '温馨提示',
        message: `您将要删除就诊人【${this.editItem.realName}】,请确认是否继续？`,
      })
      .then(async ()=>{
        await delPatient(this.editItem.id)
        Toast.success("删除就诊人成功");
        this.$router.back()
      })
      .catch(()=>{
        this.$toast('已取消');
      })
    }
  },
};
</script>

<style lang="less" scoped>
  .del-btn{margin-top:15px}
</style>
