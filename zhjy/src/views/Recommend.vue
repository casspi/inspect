<template>
  <div class="content">
    <van-search v-model="searchValue" placeholder="请输入姓名搜索" @search="onSearchHandler"/>
    <van-pull-refresh
      class="patient-list"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="list.length<=0?'暂无数据':'没有更多了'"
        @load="onLoad"
      >
        <div
            v-for="item in list"
            :key="item.id"
            class="my-contact-card">
            <i class="van-icon van-icon-contact van-cell__left-icon"></i>
            <div class="right-content">
                <div>姓名：{{`${item.realName} ${item.sexStr} ${item.age}岁`}}</div>
                <div>电话：{{`${item.phonenumber}`}}</div>
                <div>推荐时间：{{`${item.createTime}`}}</div>
            </div>
        </div>
          <!--
          @click="goTo('edit',item)" -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getRecommend } from '../api/index'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchValue: '',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 1,
        pageSize: 15,
        totalPage: 0
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
  },
  methods: {
    async onLoad() {
        this.loading = true;
        if (!this.refreshing && this.pageNum < this.totalPage) {
            this.page = this.page + 1;
        }
        if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
        }
        const {pageSize, pageNum} = this
        const { data } = await getRecommend({realName: this.searchValue, pageSize, pageNum})
        this.list = this.list.concat(data.list)
        this.totalPage = Math.ceil(data.total/pageSize)
        this.loading = false;
        if (this.list.length >= data.total) {
        this.finished = true;
        }
    },
    onRefresh() {
      // 清空列表数据
        this.finished = false;
        this.refreshing = true
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
        this.pageNum = 1
        this.onLoad();
    },
    goTo(type,item){
      type === 'add'?this.$router.push({path: 'patient-edit'}):this.$router.push({path: 'patient-edit', query: item})
    },
    onSearchHandler(){
      this.searchValue = this.searchValue.trim()
      this.onRefresh()
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  height: calc((100vh));
  overflow: hidden;
  overflow-y: scroll;
  .patient-list {
  }
}
.my-contact-card{
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 16px;
    line-height: 20px;
    position: relative;
    &::before{
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 0.05333rem;
        background: -webkit-repeating-linear-gradient(135deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
        background: repeating-linear-gradient(-45deg,#ff6c6c 0,#ff6c6c 20%,transparent 0,transparent 25%,#1989fa 0,#1989fa 45%,transparent 0,transparent 50%);
        background-size: 2.13333rem;
        content: '';
    }
}
.right-content{
    margin-left: 5px;
}
</style>
