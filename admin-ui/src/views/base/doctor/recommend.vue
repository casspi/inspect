<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="150px">
      <el-form-item label="公众号登录者姓名" prop="realName">
        <el-input
          v-model="queryParams.realName"
          placeholder="请输入公众号登录者姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公众号登录者手机号" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入公众号登录者手机号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="公众号登录者姓名" align="center" prop="realName" />
      <el-table-column label="公众号登录者手机号" align="center" prop="phonenumber" />
      <el-table-column label="医生" align="center" prop="doctorName" />
      <el-table-column label="推荐时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import {  getData, delData, addData, updateData, exportData } from "@/api/system/dict/data";
import { myRecommendList } from "@/api/base/doctor";
import { listType, getType } from "@/api/system/dict/type";

export default {
  name: "Data",
  data() {
    return {
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 推荐表格数据
      dataList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        realName: undefined,
        phonenumber: undefined,
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询我的推荐数据列表 */
    getList() {
      this.loading = true;
      myRecommendList({doctorId: this.$route.query.doctorId,...this.queryParams})
      .then(response => {
        console.log(response)
        this.dataList = response.rows;
        this.total = response.total;
        this.loading = false;
      },error =>{
        this.loading = false;
      })
      
    },
    // 表单重置
    reset() {
      this.form = {
        realName: undefined,
        phonenumber: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
  }
};
</script>