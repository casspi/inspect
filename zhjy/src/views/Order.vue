<template>
  <div class="order-box">
    <van-tabs
      @click="onChangeTab"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      v-model="payStatus"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待支付" name="1"></van-tab>
      <van-tab title="已支付" name="6"></van-tab>
      <!-- <van-tab title="支付失败" name="9"></van-tab> -->
      <van-tab title="未支付" name="10"></van-tab>
      <!-- <van-tab title="已发货" name="3"></van-tab> -->
      <!-- <van-tab title="交易完成" name="4"></van-tab> -->
    </van-tabs>
    <div class="block"></div>
    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        class="order-list-refresh"
      >
        <van-list
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div
            v-for="(item, index) in list"
            :key="index"
            class="order-item-box"
            @click="goTo(item)"
          >
            <div class="order-item-header">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.payStatusStr }}</span>
            </div>
            <div class="order-item-header">
              <span>实付金额：{{ item.actualAmount }}</span>
              <span>{{ item.inspectionStatus }}</span>
            </div>
            <van-card
              v-for="one in item.itemList"
              :key="one.inspectId"
              :title="one.inspectName"
            >
              <template slot="title">
                <div class="my-card-title">
                  <span>检验项目：<van-tag type="primary" size="medium" plain>{{one.inspectName}}</van-tag></span>
                  <!-- <span>检验状态：<van-tag :type="one.inspectionStatus===2?'success':'danger'">{{one.inspectionStatus===2? '检验完成':'检验中'}}</van-tag></span> -->
                </div>
              </template>
            </van-card>
              <!-- :price="one.actualAmount"
              :desc="'就诊人：' + item.patientName"
              :num="one.goodsCount"
              :thumb="one.goodsCoverImg" -->
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";
import {mapGetters} from 'vuex'
export default {
  name: "Order",
  data() {
    return {
      payStatus: "",
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
    };
  },
  computed:{
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async loadData() {
      let userId = this.userInfo && this.userInfo.userId
      let payStatus = this.payStatus
      const {data} = await getOrderList({ userId, payStatus});
      let list = data.rows
      this.list = this.list.concat(list);
      //   this.totalPage = data.totalPage;
      this.loading = false;
      if (this.list.length >= data.total) this.finished = true;
    },
    onChangeTab(name) {
      // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
      this.payStatus = name;
      this.onRefresh();
    },
    goTo(order) {
      this.$router.push({ path: "/order-detail", query: { orderId: order.id } });
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        console.log(this.page);
        console.log(this.totalPage);
        this.page = this.page + 1;
      }
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.loadData();
    },
    onRefresh() {
      this.refreshing = true;
      this.finished = false;
      this.loading = true;
      this.page = 1;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.block {
  height: 44px;
}
.order-box {
  .order-tab {
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  .content {
    height: calc(~"(100vh)");
    overflow: hidden;
    overflow-y: scroll;
  }
  .order-list-refresh {
    .van-card__content {
      min-height: auto!important;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px 0;
      padding-bottom: 20px;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      .order-item-header {
        padding: 10px 10px 0 10px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>
