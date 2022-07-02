<template>
  <div class="home" ref="home">
    <van-swipe class="my-swipe" :autoplay="5000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="hot hot-category">
        <p class="hot-title">热门分类
            <span class="more" @click="handleMore">
                查看更多
                <i class="van-icon van-icon-arrow"></i>
            </span>
        </p>
        <ul class="hot-category-list">
            <li class="hot-category-list-item" v-for="item in 6" :key="item" :name="'肿瘤'+item">
                <img src="../assets/xm/xm01.jpg" width="100%" height="100%" alt="">
            </li>
        </ul>
    </div>
    <div class="hot hot-recommend">
        <p class="hot-title">热门推荐</p>
        <ul class="hot-recommend-list">
            <li class="hot-recommend-list-item" v-for="item in 5" :key="item" >
                <img src="../assets/xm/xm03.jpg" width="100%" height="100%" alt="">
                <p class="name">男性肿瘤易感染32项</p>
            </li>
        </ul>
    </div>

    <div class="block"></div>
    <van-tabbar route active-color="#1baeae" inactive-color="#000">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/" icon="notes-o">检查</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import { getRecommendItemList } from "@/api/index";

export default {
  name: "Home",
  components: {},
  computed:{
    ...mapGetters(["userInfo"]),
  },
  mounted() {

  },
  data() {
    return {
      images: [
        require("../assets/xm/xm03.jpg"),
        require("../assets/xm/xm04.jpg"),
      ],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  created() {
    this.getRecommendItemList()
  },
  methods: {
      handleMore() {
          this.$router.replace('/')
      },
      async getRecommendItemList() {
        const res =  await getRecommendItemList({num:5})
        console.log(res);
      }
  },
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.home {
  h4 {
    font-weight: 500;
    font-size: 21px;
    color: #000;
    padding: 0 20px;
  }
  .my-swipe {
    .van-swipe-item {
      height: 150px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .block {
    height: 50px;
  }
}
.hot{
    padding: 10px 15px 0;
    &-title{
        font-weight: bold;
        line-height: 40px;
        font-size: 14px;
        .more{
            float: right;
            font-size: 12px;
            color: #999;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
}
.hot-category-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &-item{
        width: 108px;
        height: 108px;
        margin-bottom: 10px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        &:not(:nth-child(3n+0)){
            margin-right: 10px;
        }
        &::after{
            content: attr(name);
            position: absolute;
            left: 0;
            bottom: 20px;
            height: 28px;
            line-height: 22.5px;
            color: #fff;
            background-color: rgba(126, 108, 221, 0.8);
            text-align: center;
            padding: 0 5px;
            font-size: 12px;
        }
    }
}
.hot-recommend{
    padding-top: 0;
    &-list{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        &-item{
            width: 167.5px;
            height: 167.5px;
            border-radius: 4px;
            margin-bottom: 10px;
            overflow: hidden;
            position: relative;
            &:nth-child(odd){
                margin-right: 10px;
            }
            .name{
                position: absolute;
                bottom: 0;
                right: 0;
                width: 125px;
                line-height: 16px;
                color: #fff;
                background-color: #2458f5;
                text-align: right;
                padding: 0 5px;
                border-radius: 4px 0 0 0;

            }
        }
    }
}
</style>
