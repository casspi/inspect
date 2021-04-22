<template>
  <div class="create-order">
    <!-- <s-header :name="'生成订单'" @callback="deleteLocal"></s-header> -->
    <div class="order-status">
      <div class="status-item">
        <label>患者姓名：</label>
        <span>{{ "张三" }}</span>
      </div>
      <div class="status-item">
        <label>检查项目：</label>
        <span>{{ this.$route.query.testsName }}</span>
      </div>
    </div>
    <van-form class="cr-form">
      <van-field
        v-model="dotName"
        name="dotName"
        label="医生姓名"
        placeholder="医生姓名"
        @click="showPicker = true"
        readonly
        clickable
      />
      <van-field
        v-model="remark"
        rows="1"
        autosize
        label="备注"
        type="textarea"
        placeholder="请输入备注"
        />
      <!-- :rules="[{ required: true, message: '请填写用户名' }]" -->
    </van-form>
    <div class="good">
      <div class="good-item">
        <div class="good-img">
          <img :src="tests.goodsCoverImg" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ tests.testsName }}</span>
            <span>x{{ tests.goodsCount }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ tests.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button
        @click="payHandler"
        class="pay-btn"
        color="#1baeae"
        type="primary"
        block
        >立即支付</van-button
      >
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
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "CreateOrder",
  data() {
    return {
      showPay: false,
      tests: {},
      dotName: "",
      showPicker: false,
      columns: ["张医生", "李医生", "医生3"],
      remark:''
    };
  },
  mounted() {
    this.init();
  },
  created() {},
  computed: {
    total() {
      let sum = 0;
      sum = this.tests.sellingPrice;
      return sum;
    },
  },
  methods: {
    //初始化数据
    async init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      //   const { id } = this.$route.query
      console.log(this.$route.query);
      setTimeout(() => {
        this.tests = {
          testsName: this.$route.query.testsName,
          cartItemId: 9037,
          goodsId: 10908,
          goodsCount: 1,
          goodsCoverImg: require("../assets/xm/xm01.jpg"),
          sellingPrice: 6488,
        };
        Toast.clear();
      }, 1000);
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
    payHandler() {
        if(!this.dotName){
            this.$toast('请选择您的送检医生!');
        }
      //   function onBridgeReady() {
      //     WeixinJSBridge.invoke(
      //       "getBrandWCPayRequest",
      //       {
      //         appId: "wx2421b1c4370ec43b", //公众号ID，由商户传入
      //         timeStamp: "1395712654", //时间戳，自1970年以来的秒数
      //         nonceStr: "e61463f8efa94090b1f366cccfbbb444", //随机串
      //         package: "prepay_id=u802345jgfjsdfgsdg888",
      //         signType: "MD5", //微信签名方式：
      //         paySign: "70EA570631E4BB79628FBCA90534C63FF7FADD89", //微信签名
      //       },
      //       function (res) {
      //         if (res.err_msg == "get_brand_wcpay_request:ok") {
      //           // 使用以上方式判断前端返回,微信团队郑重提示：
      //           //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //         }
      //       }
      //     );
      //   }
      //   if (typeof WeixinJSBridge == "undefined") {
      //     if (document.addEventListener) {
      //       document.addEventListener(
      //         "WeixinJSBridgeReady",
      //         onBridgeReady,
      //         false
      //       );
      //     } else if (document.attachEvent) {
      //       document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
      //       document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
      //     }
      //   } else {
      //     onBridgeReady();
      //   }
    },
    handleCreateOrder() {
      this.showPay = true;
    },
    close() {
      this.showPay = false;
    },
    onConfirm(value) {
      this.dotName = value;
      this.showPicker = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
/deep/ .van-cell{font-size: 15px;}
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
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
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
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
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
    padding-bottom: 50px;
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
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>