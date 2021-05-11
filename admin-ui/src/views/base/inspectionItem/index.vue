<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="检验项目名称" prop="itemName">
        <el-input
          v-model="queryParams.itemName"
          placeholder="请输入检验项目名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检验项目分类" prop="itemClassify">
        <el-input
          v-model="queryParams.itemClassify"
          placeholder="请输入检验项目分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="样本类型" prop="sampleType">
        <el-select v-model="queryParams.sampleType" placeholder="请选择样本类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="itemUnit">
        <el-input
          v-model="queryParams.itemUnit"
          placeholder="请输入单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="价格" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入价格"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="折扣百分比" prop="discountPercent">
        <el-input
          v-model="queryParams.discountPercent"
          placeholder="请输入折扣百分比"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="折扣金额" prop="discountAmount">
        <el-input
          v-model="queryParams.discountAmount"
          placeholder="请输入折扣金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检验所主键" prop="inspectionOfficeId">
        <el-input
          v-model="queryParams.inspectionOfficeId"
          placeholder="请输入检验所主键"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检验所项目主键" prop="inspectionOfficeItemId">
        <el-input
          v-model="queryParams.inspectionOfficeItemId"
          placeholder="请输入检验所项目主键"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择角色状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['base:inspectionItem:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['base:inspectionItem:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['base:inspectionItem:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['base:inspectionItem:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inspectionItemList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="检验项目名称" align="center" prop="itemName" />
      <el-table-column label="检验项目分类" align="center" prop="itemClassify" />
      <el-table-column label="样本类型" align="center" prop="sampleType" />
      <el-table-column label="单位" align="center" prop="itemUnit" />
      <el-table-column label="价格" align="center" prop="amount" />
      <el-table-column label="折扣百分比" align="center" prop="discountPercent" />
      <el-table-column label="折扣金额" align="center" prop="discountAmount" />
      <el-table-column label="检验项目介绍" align="center" prop="summary" />
      <el-table-column label="检验所主键" align="center" prop="inspectionOfficeId" />
      <el-table-column label="检验所项目主键" align="center" prop="inspectionOfficeItemId" />
      <el-table-column label="角色状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['base:inspectionItem:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:inspectionItem:remove']"
          >删除</el-button>
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

    <!-- 添加或修改检验项目信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="检验项目名称" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入检验项目名称" />
        </el-form-item>
        <el-form-item label="检验项目分类" prop="itemClassify">
          <el-input v-model="form.itemClassify" placeholder="请输入检验项目分类" />
        </el-form-item>
        <el-form-item label="样本类型" prop="sampleType">
          <el-select v-model="form.sampleType" placeholder="请选择样本类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="单位" prop="itemUnit">
          <el-input v-model="form.itemUnit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="价格" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="折扣百分比" prop="discountPercent">
          <el-input v-model="form.discountPercent" placeholder="请输入折扣百分比" />
        </el-form-item>
        <el-form-item label="折扣金额" prop="discountAmount">
          <el-input v-model="form.discountAmount" placeholder="请输入折扣金额" />
        </el-form-item>
        <el-form-item label="检验项目介绍" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="检验所主键" prop="inspectionOfficeId">
          <el-input v-model="form.inspectionOfficeId" placeholder="请输入检验所主键" />
        </el-form-item>
        <el-form-item label="检验所项目主键" prop="inspectionOfficeItemId">
          <el-input v-model="form.inspectionOfficeItemId" placeholder="请输入检验所项目主键" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="删除标志" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInspectionItem, getInspectionItem, delInspectionItem, addInspectionItem, updateInspectionItem, exportInspectionItem } from "@/api/base/inspectionItem";

export default {
  name: "InspectionItem",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 检验项目信息表格数据
      inspectionItemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemName: null,
        itemClassify: null,
        sampleType: null,
        itemUnit: null,
        amount: null,
        discountPercent: null,
        discountAmount: null,
        summary: null,
        inspectionOfficeId: null,
        inspectionOfficeItemId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "角色状态不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询检验项目信息列表 */
    getList() {
      this.loading = true;
      listInspectionItem(this.queryParams).then(response => {
        this.inspectionItemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        itemName: null,
        itemClassify: null,
        sampleType: null,
        itemUnit: null,
        amount: null,
        discountPercent: null,
        discountAmount: null,
        summary: null,
        inspectionOfficeId: null,
        inspectionOfficeItemId: null,
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加检验项目信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getInspectionItem(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改检验项目信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateInspectionItem(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInspectionItem(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除检验项目信息编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInspectionItem(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有检验项目信息数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportInspectionItem(queryParams);
        }).then(response => {
          this.download(response.data);
        })
    }
  }
};
</script>
