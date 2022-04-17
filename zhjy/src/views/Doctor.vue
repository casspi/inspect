<template>
  <div class="content">
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
                  <div>姓名：{{`${item.doctorName} ${item.sexStr} ${item.age}岁`}}</div>
                  <div>所属医院：{{`${item.hospitalName}`}} {{`${item.position}`}} {{`${item.jobTitle}`}}</div>
                  <div>创建时间：{{`${item.createTime}`}}</div>
              </div>
          </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { salesmanDoctorList } from '../api/doctor'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      const data = await salesmanDoctorList()
      console.log(data)
      this.list = this.list.concat(data.rows)
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
    }
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.content {
  height: calc((100vh));
  overflow: hidden;
  overflow-y: scroll;
  .patient-list {
  }
  .add-btn{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
    height: 50px;
  }
}
</style>
