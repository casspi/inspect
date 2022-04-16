<template>
  <div class="order-detail-box">
    <van-sticky>
      <van-notice-bar
        v-show="detail.payStatus === 6"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o" v-if="(userType ==1)"
      >
        您的检查项目已经下单成功，我们会尽快安排工作人员进行检测。
      </van-notice-bar>
      <van-notice-bar v-show="detail.payStatus === 1" v-if="(userType ==1)" left-icon="info-o">
        您的订单尚未完成支付，请尽快支付以免耽误检查。
      </van-notice-bar>
    </van-sticky>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ detail.payStatusStr }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.number }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <div class="status-item" v-if="(userType!=3&&detail.payStatus == 8)">
        <label>申请时间：</label>
        <span>{{ detail.cancelApplyTime }}</span>
      </div>
      <div class="status-item" v-if="(userType!=2)">
        <label>下单者：</label>
        <span>{{ detail.realName }}({{   detail.phonenumber}})</span>
      </div>
      <div class="status-item">
        <label>就诊人：</label>
        <span>{{ detail.patientName }}({{   detail.patientIdNumber}})</span>
      </div>
      <div class="status-item" v-if="(userType !=3)">
        <label>送检医生：</label>
        <span v-if="(userType ==1)">{{detail.doctorName }}({{detail.doctorPhone}},{{detail.hospitalName}})</span>
        <span v-if="(userType ==2)">{{detail.doctorName }}({{detail.hospitalName}})</span>
      </div>
      <div class="status-item">
        <label>紧急联系人：</label>
        <span>{{ detail.urgentUserName }}({{detail.urgentUserPhone}})</span>
      </div>
      <!-- <van-button v-if="[1,2,3].includes(detail.payStatus)" style="margin-bottom: 10px" color="#1baeae" block @click="confirmOrder(detail.orderNo)">确认订单</van-button> -->
      <van-button
        v-if="detail.payStatus == 1&&userType==2 "
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        @click="WXpay"
        >去支付</van-button
      >
      <van-button  v-if="(detail.payStatus == 1&&userType==2)" block @click="handleCancelOrder(detail.id)">取消订单</van-button>
      <van-button  v-if="(detail.payStatus == 6&&userType==2)" block @click="handleCancelApplyOrder(detail.id)">申请退款</van-button>
      <van-button  v-if="(detail.payStatus == 8&&userType==1)" block @click="handleAuditOrder(detail.id)">退款审核</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>总金额：</label>
        <span>¥ {{ detail.amount }}元</span>
      </div>
      <div class="price-item">
        <label>实付金额：</label>
        <span>¥ {{ detail.actualAmount }}元</span>
      </div>
    </div>
    <van-card
      v-for="item in detail.itemList"
      :key="item.inspectId"
      style="background: #fff"
      :num="item.goodsCount"
      :price="(item.actualAmount || '-') +'元'"
      :origin-price="(item.amount || '-') + '元'"
      desc=""
    >
    <template slot="title">
      <div class="my-card-title">
        <span>检验项目：<van-tag type="primary" size="medium" plain>{{item.inspectName}}</van-tag></span>
        <span v-if="detail.payStatus === 6">检验状态：<van-tag :type="item.inspectionStatus===2?'success':'danger'">{{item.inspectionStatus===2? '检验完成':'检验中'}}</van-tag></span>
      </div>
    </template>
     <template v-if="detail.payStatus === 6 && item.inspectionStatus === 2" #footer>
       <router-link :to="{path: 'result', query: {inspect: JSON.stringify(item)}}"><van-button type="primary" size="mini">查看检验结果</van-button></router-link>
     </template>
    </van-card>
      <!-- :thumb="item.goodsCoverImg" -->
  </div>
</template>

<script>
import { getLocal } from "@/common/js/utils";
import {
  getOrderDetail,
  cancelOrder,
  confirmOrder,
  refund,
  cancelApply,
  // payOrder,
} from "@/api/order";
import { prePay } from '@/api/index'
import { Dialog, Toast } from "vant";
import { mapGetters } from'vuex'
export default {
  name: "OrderDetail",
  components: {},
   computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      userType:-1,//用户角色
      detail: {},
    };
  },
  mounted() {
    this.init();
    this.userType =  getLocal('userType');
    console.log(this.userType);
  },
  methods: {
    async init() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const { orderId:id } = this.$route.query;
      const { data } = await getOrderDetail({id})
      this.detail = data || {};
      Toast.clear();
    },
    handleCancelOrder(id) {
      Dialog.confirm({
        title: "确认取消订单？",
      })
        .then(() => {
          cancelOrder({id}).then((res) => {
            if (res.code == 200) {
              Toast("取消成功");
              this.init();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    //申请退款
    handleCancelApplyOrder(id) {
      Dialog.confirm({
        title: "确认取消订单？",
      })
        .then(() => {
          cancelApply({id: this.detail.id,number: this.detail.number}).then((res) => {
            if (res.code == 200) {
              Toast("申请成功，请等待审核");
              this.init();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    //申请退款 审核
    handleAuditOrder(id) {
      Dialog.confirm({
        title: "审核是否通过？",
      }).then(() => {
          refund({id: this.detail.id,number: this.detail.number}).then((res) => {
            if (res.code == 200) {
              Toast("退款成功");
              this.init();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    handleConfirmOrder(id) {
      Dialog.confirm({
        title: "是否确认订单？",
      })
        .then(() => {
          confirmOrder(id).then((res) => {
            if (res.code == 200) {
              Toast("确认成功");
              this.init();
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    async WXpay() {
        const _this = this
        const resData = await prePay({id: this.detail.id,orderNumber: this.detail.number})
      console.log(resData)
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
      } else {
        console.log('start pay')
        onBridgeReady();
      }
      function onBridgeReady() {
        try {
          WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              ...resData.data
            },
            function (res) {
                console.log(res)
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    //刷新页面
                    _this.init()
                }
            }
          );
        } catch (error) {
          Toast("未知错误");
        }
      }
    },
    async handlePayOrder(id, type) {
      console.log(id, type);
      Toast.loading;
      // await payOrder({ orderNo: id, payType: type });
      this.init();
    },
    close() {
      Dialog.close();
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail-box {
  background: #f7f7f7;
  .order-status {
    background: #fff;
    padding: 20px;
    font-size: 14px;
    .status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 14px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
      span {
      }
    }
  }
  .van-card {
    margin-top: 0;
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 62px;
  }
  .my-card-title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
