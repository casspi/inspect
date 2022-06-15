<template>
  <div class="create-order" id="screen">
    <!-- <s-header :name="'生成订单'" @callback="deleteLocal"></s-header> -->
    <!-- <div class="order-status">
      <div class="status-item">
        <label>就诊人姓名：</label>
        <span
          >{{ userInfo.realName }} {{ userInfo.sex }} {{ userInfo.age }}({{
            userInfo.userId
          }})</span
        >
      </div>
    </div> -->
    <van-form class="cr-form" ref="orderForm">
      <!-- <van-field
        v-model="patientId"
        name="patientId"
        label="就诊人姓名"
        placeholder="就诊人姓名"
        :rules="[{ required: true, message: '请选择就诊人' }]"
      /> -->
      <van-field
        readonly
        clickable
        label="就诊人姓名"
        :value="patientName"
        placeholder="就诊人姓名"
        @click="patientPickerHandler"
        :rules="[{ required: true, message: '请选择就诊人' }]"
      />
      <van-field
          class="doctor-field"
        v-model="doctorUserName"
        name="doctorUserId"
        label="医生二维码"
        readonly
        placeholder="请扫医生二维码"
        :rules="[{ required: true, message: '请扫医生二维码' }]"
      >
        <template slot="button" name="button">
          <van-icon name="scan" size="24" @click="handleScan" />
<!--          <van-icon name="close" v-show="doctorUserId" size="24" @click="handleClearDoctor" />-->
        </template>
      </van-field>
      <van-field
        v-model="urgentUserName"
        name="urgentUserName"
        label="紧急联系人"
        placeholder="紧急联系人"
        :rules="[{ required: true, message: '请填写紧急联系人' }]"
      />
      <van-field
        v-model="urgentUserPhone"
        name="urgentUserPhone"
        label="紧急联系人电话"
        placeholder="紧急联系人电话"
        :rules="[
          { required: true, message: '请填写紧急联系人电话' },
          { validator: phoneValidator, message: '请输入正确的手机号' },
        ]"
      />

      <van-field
        v-model="remark"
        rows="1"
        autosize
        label="备注"
        type="textarea"
        placeholder="请输入备注"
      />
    </van-form>
    <div class="good">
      <p class="good-box-title">检查项目：</p>
      <div class="good-item" v-for="item in tests" :key="item.id">
        <!-- <div class="good-img">
          <img :src="require('../assets/xm/xm01.jpg')" alt="" />
        </div> -->
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.text }}</span>
            <span>{{ item.itemUnit }}</span>
          </div>
          <div class="good-btn">
            <div class="price">项目金额：¥{{ item.amount | toFixed }}元</div>
            <div class="discountAmount">
              优惠金额：¥<span>{{ item.discountAmount | toFixed }}元</span>
            </div>
            <div>实际金额：¥{{ item.amount - item.discountAmount | toFixed }}元</div>
            <!-- <div>实际金额：¥{{item.actualAmount}}</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-block"></div>
    <div class="pay-wrap">
      <div class="price">
        <span>总金额</span>
        <span>¥{{ total }}元</span>
      </div>
      <div class="price">
        <span>优惠金额</span>
        <span>-¥{{ discountTotal }}元</span>
      </div>
      <div class="price-bottom">
        实付金额
        <div class="price-total">
          ¥<span>{{ actualTotal }}元</span>
        </div>
        <van-button
          @click="payHandler"
          class="pay-btn"
          color="#1baeae"
          type="primary"
          block
          >提交订单</van-button
        >
      </div>
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model="showPay"
      position="bottom"
      :style="{ height: '30%' }"
      @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="handlePayOrder(1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="handlePayOrder(2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
    <van-popup v-model="patientPicker" round position="bottom">
      <van-picker
        get-container="#screen"
        show-toolbar
        value-key="realName"
        :columns="patientList"
        @cancel="patientPicker = false"
        @confirm="patientConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { getSignature } from "@/api/index";
import { getPatient } from "../api/patient";
import { getHospitalList,getDoctorList,doctorInfo } from "../api/doctor";
import { createOrder } from "../api/order";
export default {
  name: "CreateOrder",
  data() {
    return {
      showPay: false,
      tests: [],
      patientId: "",
      patientName: "",
      urgentUserName: "",
      urgentUserPhone: "",
      remark: "",
      patientList: [],
      hosptialList:[],
      doctorList:[],
      doctorUserId: '',
      doctorUserName: '',
      patientPicker: false,
    };
  },
  mounted() {
    this.init();
    //this.selectDoctorList('1384878507879882753');
  },
  created() {
    getSignature({
      url: window.location.href.split('#')[0]
    }).then(res => {
      const {appId, timestamp, nonceStr, signature} = res.data
      window.wx.config({
        debug: process.env.NODE_ENV === 'development'? true: false, // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名
        jsApiList: ["scanQRCode"] // 必填，需要使用的 JS 接口列表
      });
    })
  },
  computed: {
    ...mapGetters(["userInfo"]),
    checkName() {
      let str = "";
      this.$route.query.selectItems.forEach((item) => {
        str += str === "" ? item.text : `、${item.text}`;
      });
      return str;
    },
    total() {
      let sum = 0;
      this.tests.forEach((item) => {
        sum += Number(item.amount);
      });
      return sum.toFixed(2);
    },
    discountTotal() {
      let sum = 0;
      this.tests.forEach((item) => {
        sum += Number(item.discountAmount);
      });
      return sum.toFixed(2);
    },
    actualTotal() {
      let sum = 0;
      this.tests.forEach((item) => {
        sum += Number(item.amount - item.discountAmount);
      });
      return sum.toFixed(2);
    },
  },
  methods: {
    phoneValidator(val) {
      return /^[1](([3|5|8][\d])|([4][4,5,6,7,8,9])|([6][2,5,6,7])|([7][^9])|([9][1,8,9]))[\d]{8}$/.test(
        val
      );
    },
    //初始化数据
    async init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const data = await getPatient();
      console.log(data);
      this.patientList = data.rows;
      //   const { id } = this.$route.query
      console.log(this.$route.query);
      this.tests = JSON.parse(this.$route.query.selectItems) || [];
     // const hospitalListData = await getHospitalList();
     // this.hosptialList = hospitalListData.data; // 医院列表
      // {
      //   testsName: this.$route.query.testsName,
      //   cartItemId: 9037,
      //   goodsId: 10908,
      //   goodsCount: 1,
      //   goodsCoverImg: require("../assets/xm/xm01.jpg"),
      //   sellingPrice: 6488,
      // };
      Toast.clear();
      //   const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
      //   console.log('cartItemIds', cartItemIds)
      //   setLocal('cartItemIds', JSON.stringify(_cartItemIds))
      //   const { data: list } = await getByCartItemIds({ cartItemIds: _cartItemIds.join(',') })
      //   const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()
      //   if (!address) {
      //     router.push({ path: '/address' })
      //     return
      //   }
      //   state.cartList = list
      //   state.address = address
    },

      //选择病人
    patientPickerHandler() {
      if(this.patientList.length>0){
        this.patientPicker = true
      }else{
        this.$router.push({path:'patient-edit'})
      }
    }, 
      //选择病人
    selectDoctorList(val) {
      getDoctorList({id:val}).then((res) => {
          console.log("医生列表：",res);
      });
    },
    //扫码
   handleScan() {
      window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          console.log(res);
          const result = JSON.parse(res.resultStr); // 当needResult 为 1 时，扫码返回的结果
          doctorInfo(id).then(res=>{
              if(res.code==200){
                this.doctorUserId = result.key;
                this.doctorUserName = result.name;
                this.$toast.success("扫码成功");
              }else{
                handleClearDoctor();
                this.$toast.fail(res.msg);
              }
          });
          
        },
        fail: err => {
          console.log(err)
        }
      });
    },
    handleClearDoctor() {
      this.doctorUserId = '';
      this.doctorUserName = '';
    },
    payHandler() {
      let _this = this;
      this.$refs.orderForm
        .validate()
        .then(async () => {
          let itemList = [];
          this.tests.map((item) => {
            itemList.push({
              inspectId: item.id,
              // inspectName: item.text
            });
          });
          let doctorUserId = _this.doctorUserId;
          const { urgentUserName, urgentUserPhone, remark, patientId} = this;
          const {data} = await createOrder({
            itemList,
            patientId,
            urgentUserName,
            urgentUserPhone,
            doctorUserId,
            remark,
          }).then(e=>{
           console.log('then: ',e);
           this.$router.replace({path: 'order-detail', query: {orderId: e.data}})
           this.$toast.success("提交成功！");
          }).catch(e=>{
             if(e.code==500){
              this.$toast.fail(e.msg);
              return;
             }
          });
          // const data= await wxLogin()
          //console.log(data);
         
        })
        .catch(() => {
         //console.log(data);
        });
      // if (!this.doctorId) {
      //   this.$toast("请选择您的送检医生!");
      // } else {
      //   (async () => {
      //     await this.$toast.success("支付成功！");
      //     setTimeout(() => {
      //       this.$router.push({ path: "order" });
      //     },1000)
      //   })()
      // }


    },
    patientConfirm(val) {
      this.patientId = val.id;
      this.patientName = val.realName;
      this.patientPicker = false;
    },
    handleCreateOrder() {
      this.showPay = true;
    },
    close() {
      this.showPay = false;
    },
    onConfirm(value) {
      this.doctorId = value;
      this.showPicker = false;
    },
    onHosConfirm(val) {
      console.log(val);
      this.showHospitalPicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
/deep/ .van-cell {
  font-size: 15px;
}
.create-order {
  background: #f9f9f9;
  .order-status {
    background: #fff;
    padding: 20px;
    font-size: 15px;
    margin-bottom: 20px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .cr-form {
    margin-bottom: 20px;
  }
  .good {
    padding-bottom: 142px;
  }
  .good-box-title {
    background: #fff;
    margin: 0;
    padding: 10px 10px 0;
    font-size: 16px;
  }
  .good-item {
    // padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        .wh(100px, 100px);
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .price {
          font-size: 14px;
          color: red;
          line-height: 28px;
        }
        .discountAmount {
          color: #999;
          span {
            text-decoration: line-through;
          }
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    // padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
      &.price-bottom {
        flex-direction: row;
        padding: 0 0 0 5%;
        margin: 0;
        .price-total {
          color: red;
          span {
            font-size: 18px;
          }
        }
      }
    }
    .pay-btn {
      // position: fixed;
      // bottom: 7px;
      // right: 0;
      // left: 0;
      width: 110px;
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
      // margin: 0 auto;
    }
  }
}
.doctor-field /deep/ .van-field__body{
  align-items: start;
}
</style>
