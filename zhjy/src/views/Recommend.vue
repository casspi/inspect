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
            :key="item.id">
            <van-contact-card
                type="edit"
                :editable="false"
                :name="`${item.realName} ${item.sexStr} ${item.age}`"
                :tel="item.phonenumber"
            />
            <span>推荐时间：{{item.createTime}}</span>
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
      pageNum: 1
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
  },
  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      const { data } = await getRecommend({realName: this.searchValue})
      console.log(data)
      this.list = this.list.concat(data.list)
      this.loading = false;
      if (this.list.length >= data.total) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
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
</style>
