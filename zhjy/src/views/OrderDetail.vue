<template>
  <div class="order-detail-box">
    <van-sticky>
      <van-notice-bar
        v-show="detail.payStatus === 6"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o" v-if="(userType ==2)"
      >
        您的检查项目已经下单成功，我们会尽快安排工作人员进行检测。
      </van-notice-bar>
      <van-notice-bar v-show="detail.payStatus === 1" v-if="(userType ==2)" left-icon="info-o">
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
        <p>
            <span>检验项目：</span>
            <van-tag type="primary" size="medium" plain>{{item.inspectName}}</van-tag>
        </p>
        <p v-if="detail.payStatus === 6" class="item-status">
            <span>检验状态：</span>
            <van-tag :type="item.inspectionStatus===1?'success':'danger'">{{item.inspectionStatus===6? '检验完成':'检验中'}}</van-tag>
            <van-icon name="scan" size="24" @click="handleScan" />
        </p>
      </div>
    </template>
     <template v-if="detail.payStatus === 6 && item.inspectionStatus === 6" #footer>
       <router-link :to="{path: 'result', query: {inspect: JSON.stringify(item)}}"><van-button size="mini">查看检验结果</van-button></router-link>
     </template>
    </van-card>
      <van-dialog v-model="showAuditDialog"
                  title="审核是否通过？"
                  show-cancel-button
                  close-on-click-overlay
                  cancel-button-text="不通过"
                  confirm-button-text="通过"
                  :beforeClose="beforeClose"
                  @confirm="handleConfirmOrCancel(1)"
                  @cancel="handleConfirmOrCancel(2)">
          <van-field
              v-model="content"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入审核意见"
              show-word-limit
          />
      </van-dialog>
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
import { prePay, getSignature } from '@/api/index';
import { Dialog, Toast } from "vant";
import { mapGetters } from'vuex'
import {saveBarcode} from "../api/order";
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
            showAuditDialog: false,
            content: ''
        }
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
    //取消订单
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
        title: "确认申请退款？",
      })
        .then(() => {
          cancelApply({id, number: this.detail.number}).then((res) => {
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

        //申请退款 审核弹框
        handleAuditOrder() {
            this.showAuditDialog = true
        },
        //通过、不通过
        async handleConfirmOrCancel(auditStatus) {
            const { detail: { id }, content } = this
            if(!content) throw '审核意见不能为空'
            const { code } = await refund({id, auditStatus, content})
            if(code == 200) this.init()
        },
        beforeClose(action, done){
            if (['confirm', 'cancel'].includes(action) && !this.content) {
                return done(false)
            }else {
                done(true)
                this.content = ''
            }
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
    //扫码
    handleScan() {
      window.wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          console.log(res);
          const inspectionLabel = res.resultStr.split(',')[1]; // 当needResult 为 1 时，扫码返回的结果
          const { orderId:id } = this.$route.query
          saveBarcode({id, inspectionLabel })
          .then(() => {
            this.$toast.success("扫码成功");
          })
        },
        fail: err => {
          console.log(err)
        }
      });
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
      &:not(:last-child){
          border-bottom: 1px solid #eee;
      }
  }
  .van-card__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 62px;
  }
  .my-card-title{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      >p{
          flex: 1;
          display: flex;
          flex-direction: row;
          margin: 0 0 6px 0;
          /deep/ .van-tag{
              max-width: 270px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
          }
      }
  }
}
.item-status{
  /deep/ .van-tag{
    height: 17px;
  }
  i{
    margin-left: auto;
  }
}
</style>
