<template>
  <div class="order-box">
    <van-tabs
      @click="onChangeTab"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      v-model="status"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
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
            @click="goTo(item.orderNo)"
          >
            <div class="order-item-header">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.orderStatusString }}</span>
            </div>
            <van-card
              v-for="one in item.newBeeMallOrderItemVOS"
              :key="one.orderId"
              :num="one.goodsCount"
              :price="one.sellingPrice"
              desc="全场包邮"
              :title="one.goodsName"
              :thumb="one.goodsCoverImg"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
// import { getOrderList } from "@/api/order";

export default {
  name: "Order",
  data() {
    return {
      status: "",
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0,
    };
  },
  methods: {
    async loadData() {
      //   const {
      //     data,
      //     data: { list },
      //   } = await getOrderList({ pageNumber: this.page, status: this.status });
      let list = [
        {
          orderId: 6355,
          orderNo: "16189968036847266",
          totalPrice: 6488,
          payType: 1,
          orderStatus: 1,
          orderStatusString: "已支付",
          createTime: "2021-04-21 17:20:03",
          newBeeMallOrderItemVOS: [
            {
              goodsId: 10908,
              goodsCount: 1,
              goodsName: "肿瘤检查01",
              goodsCoverImg: require("../assets/xm/xm02.jpg"),
              sellingPrice: 6488,
            },
          ],
        },
        {
          orderId: 6352,
          orderNo: "16189924567821058",
          totalPrice: 6488,
          payType: 2,
          orderStatus: 1,
          orderStatusString: "已支付",
          createTime: "2021-04-21 16:07:36",
          newBeeMallOrderItemVOS: [
            {
              goodsId: 10908,
              goodsCount: 1,
              goodsName: "肿瘤检查01",
              goodsCoverImg: require("../assets/xm/xm02.jpg"),
              sellingPrice: 6488,
            },
          ],
        },
        {
          orderId: 6347,
          orderNo: "16189881317362569",
          totalPrice: 12976,
          payType: 2,
          orderStatus: 1,
          orderStatusString: "已支付",
          createTime: "2021-04-21 14:55:31",
          newBeeMallOrderItemVOS: [
            {
              goodsId: 10908,
              goodsCount: 1,
              goodsName: "肿瘤检查01",
              goodsCoverImg: require("../assets/xm/xm03.jpg"),
              sellingPrice: 6488,
            },
            {
              goodsId: 10907,
              goodsCount: 1,
              goodsName: "肿瘤检查01",
              goodsCoverImg: require("../assets/xm/xm04.jpg"),
              sellingPrice: 6488,
            },
          ],
        },
        {
          orderId: 6335,
          orderNo: "16189055733715033",
          totalPrice: 7988,
          payType: 1,
          orderStatus: 1,
          orderStatusString: "已支付",
          createTime: "2021-04-20 15:59:33",
          newBeeMallOrderItemVOS: [
            {
              goodsId: 10909,
              goodsCount: 1,
              goodsName: "HUAWEI Mate 40 Pro+ 5G 全网通 1...",
              goodsCoverImg: require("../assets/xm/xm01.jpg"),
              sellingPrice: 7988,
            },
          ],
        },
      ];
      this.list = this.list.concat(list);
      //   this.totalPage = data.totalPage;
      this.loading = false;
      //   if (this.page >= data.totalPage) this.finished = true;
    },
    onChangeTab(name) {
      // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
      this.status = name;
      this.onRefresh();
    },
    goTo(id) {
      this.$router.push({ path: "/order-detail", query: { id } });
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
.order-box {
  .order-tab {
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
  }
  .content {
    height: calc(~"(100vh - 70px)");
    overflow: hidden;
    overflow-y: scroll;
    // margin-top: 34px;
  }
  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .order-item-box {
      margin: 20px 10px;
      background-color: #fff;
      .order-item-header {
        padding: 10px 20px 0 20px;
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
