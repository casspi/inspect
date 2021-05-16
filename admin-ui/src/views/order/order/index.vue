<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="120spx"
    >
      <el-form-item label="订单编号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入订单编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="患者id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入患者id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="总金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入总金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实付金额" prop="actualAmount">
        <el-input
          v-model="queryParams.actualAmount"
          placeholder="请输入实付金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="开单医院" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入开单医院"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开单医生" prop="doctorId">
        <el-input
          v-model="queryParams.doctorId"
          placeholder="请输入开单医生"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付时间" prop="payTime">
        <el-date-picker
          clearable
          size="small"
          style="width: 200px"
          v-model="queryParams.payTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择支付时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付状态" prop="payStatus">
        <el-select
          v-model="queryParams.payStatus"
          placeholder="请选择支付状态"
          clearable
          size="small"
        >
        <el-option
                v-for="dict in payStatusAarr"
                :key="dict.code"
                :label="dict.msg"
                :value="dict.code"
              />  
        </el-select>
      </el-form-item>
      <el-form-item label="检验状态" prop="inspectionStatus">
        <el-select
          v-model="queryParams.inspectionStatus"
          placeholder="请选择检验状态"
          clearable
          size="small"
        >
          <el-option
                v-for="dict in inspectionArr"
                :key="dict.code"
                :label="dict.msg"
                :value="dict.code"
              />  
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="紧急联系人" prop="urgentUserName">
        <el-input
          v-model="queryParams.urgentUserName"
          placeholder="请输入紧急联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急联系人电话" prop="urgentUserPhone">
        <el-input
          v-model="queryParams.urgentUserPhone"
          placeholder="请输入紧急联系人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="角色状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择角色状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="cyan"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['order:order:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['order:order:edit']"
          >修改</el-button
        > -->
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['order:order:remove']"
          >删除</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['order:order:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单编号" align="center" prop="number" width="300">
        <template slot-scope="scope">
          <el-link type="primary" @click="openDetailHandle(scope.row)">{{
            scope.row.number
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="注册人" align="center" prop="realName" />
      <el-table-column label="注册人手机号" align="center" prop="phonenumber" />
      <!-- <el-table-column label="患者" align="center" prop="patientName" /> -->
      <el-table-column label="总金额" align="center" prop="amount" />
      <el-table-column label="实付金额" align="center" prop="actualAmount" />
      <el-table-column label="开单医院" align="center" prop="hospitalName" />
      <el-table-column label="开单医生" align="center" prop="doctorName" />
      <el-table-column label="创建时间" align="center" prop="createTime"  width="150" />
      <el-table-column
        label="支付时间"
        align="center"
        prop="payTime"
        width="150"
      >
        <!-- <template slot-scope="scope">
          <span>{{ parseTime(scope.row.payTime, "{y}-{m}-{d}") }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="支付状态" align="center" prop="payStatus">
        <template slot-scope="scope">
          <span>{{ scope.row.payStatus | parsePayStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检验状态" align="center" prop="inspectionStatus" />
      <!-- <el-table-column label="紧急联系人" align="center" prop="urgentUserName" />
      <el-table-column label="紧急联系人电话" align="center" prop="urgentUserPhone" /> -->
      <!-- <el-table-column label="状态" align="center" prop="status" /> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['order:order:edit']"
            >修改</el-button
          > -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['order:order:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 订单详情弹框-->
    <el-dialog
      title="订单详情"
      :visible.sync="openDetail"
      width="900px"
      append-to-body
    >
      <el-form ref="detailForm" :model="orderDetail" label-position="right" label-width="120px">
        <el-form-item label="订单编号">
          {{ orderDetail.number }}
        </el-form-item>
         <el-row>
          <el-col :span="12">
        <el-form-item label="下单人：">
          {{ orderDetail.realName }}
        </el-form-item>
         </el-col>
          <el-col :span="12">
         <el-form-item label="下单人手机号：">
          {{ orderDetail.phonenumber }}
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="患者姓名：">
          {{ orderDetail.patientName }}
        </el-form-item>
         </el-col>
          <el-col :span="12">
         <el-form-item label="患者身份证号：">
          {{ orderDetail.patientIdNumber }}
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="检验项目：">
          <el-table :data="orderDetail.itemList" border style="line-height: 0">
            <el-table-column label="项目名称" align="center" prop="inspectName" >
              <template slot-scope="scope">
                <el-tag size="small">{{ scope.row.inspectName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="检验所" align="center" prop="officeName" >
              <template slot-scope="scope">
                {{ scope.row.officeName }}
              </template>
            </el-table-column>
            <el-table-column label="检验所项目" align="center" prop="officeItemName" >
              <template slot-scope="scope">
               {{ scope.row.officeItemName }}
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" :formatter="inspectionStatusFormat">
              
            </el-table-column>
            <el-table-column label="检验时间" align="center" prop="inspectionStatusTime">
             <template slot-scope="scope">
                {{ scope.row.inspectionStatusTime }}
              </template>  
            </el-table-column>
          </el-table>
          <!-- <el-tag size="small" v-for="(item,index) in orderDetail.itemList" :key="index">{{item.inspectName}}<span>{{item.inspectionStatus | parseInspectionStatus}}</span></el-tag> -->
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总金额：">
              {{ orderDetail.amount }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实付金额：">
              {{ orderDetail.actualAmount }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单医院：">
              {{ orderDetail.hospitalName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单医生:">
              {{ orderDetail.doctorName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付时间:">
              {{ orderDetail.payTime }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付状态:">
              {{ orderDetail.payStatus | parsePayStatus }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急联系人:">
              {{ orderDetail.urgentUserName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="紧急联系人电话:">
              {{ orderDetail.urgentUserPhone }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              {{ orderDetail.remark }}
            </el-form-item>
          </el-col>
        </el-row>

        <!-- (1待支付，6已支付，9支付失败，10未支付) -->

        <!-- (1检验中，2检验完成) -->
        <!-- <el-form-item label="检验状态">
          {{orderDetail.inspectionStatus}}
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click="detailCom">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="number">
          <el-input v-model="form.number" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="患者id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入患者id" />
        </el-form-item>
        <el-form-item label="总金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="实付金额" prop="actualAmount">
          <el-input v-model="form.actualAmount" placeholder="请输入实付金额" />
        </el-form-item>
        <el-form-item label="开单医院" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入开单医院" />
        </el-form-item>
        <el-form-item label="开单医生" prop="doctorId">
          <el-input v-model="form.doctorId" placeholder="请输入开单医生" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-date-picker
            clearable
            size="small"
            style="width: 200px"
            v-model="form.payTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择支付时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-radio-group v-model="form.payStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="检验状态">
          <el-radio-group v-model="form.inspectionStatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="urgentUserName">
          <el-input
            v-model="form.urgentUserName"
            placeholder="请输入紧急联系人"
          />
        </el-form-item>
        <el-form-item label="紧急联系人电话" prop="urgentUserPhone">
          <el-input
            v-model="form.urgentUserPhone"
            placeholder="请输入紧急联系人电话"
          />
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
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          />
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
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  exportOrder,
  getStatus,
} from "@/api/order/order";

export default {
  name: "Order",
  data() {
    return {
      // 遮罩层
      loading: true,
      payStatusAarr: [],//支付状态
      inspectionArr: [], //检验状态
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
      // 订单表格数据
      orderList: [],
      //是否显示订单详情
      openDetail: false,
      orderDetail: {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        number: null,
        userId: null,
        amount: null,
        actualAmount: null,
        hospitalId: null,
        doctorId: null,
        payTime: null,
        createTime: null,
        payStatus: null,
        inspectionStatus: null,
        urgentUserName: null,
        urgentUserPhone: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: "角色状态不能为空", trigger: "blur" },
        ],
      },
    };
  },
  filters: {
    parseInspectionStatus: function (val) {
      let text = "";
      switch (val) {
        case 1:
          text = "(检验中)";
          break;
        case 2:
          text = "(检验完成)";
          break;
        default:
          break;
      }
      return text;
    },
    parsePayStatus: function (val) {
      let text = "";
      switch (val) {
        case 1:
          text = "待支付";
          break;
        case 6:
          text = "已支付";
          break;
        case 9:
          text = "支付失败";
          break;
        case 10:
          text = "未支付";
          break;
        default:
          break;
      }
      return text;
    },
  },
  created() {
    this.getList();
    this.getStatusList();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //检验结果状态
    inspectionStatusFormat(row, column) {
      return this.selectEnumsLabel(this.inspectionArr, row.inspectionStatus);
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        number: null,
        userId: null,
        amount: null,
        actualAmount: null,
        hospitalId: null,
        doctorId: null,
        payTime: null,
        payStatus: 0,
        inspectionStatus: 0,
        urgentUserName: null,
        urgentUserPhone: null,
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    //状态
    getStatusList() {
       getStatus().then((response) => {
        this.payStatusAarr = response.data.payStatus;
        this.inspectionArr = response.data.inspectionStatus;
      });
    },
    /** 查看订单详情 */
    openDetailHandle(row) {
      const id = row.id || this.ids;
      getOrder(id).then((response) => {
        this.orderDetail = response.data;
        this.openDetail = true;
      });
    },
    /* 订单详情确认按钮 */
    detailCom() {
      this.openDetail = false;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOrder(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then((response) => {
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
      this.$confirm('是否确认删除订单编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delOrder(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有订单数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportOrder(queryParams);
        })
        .then((response) => {
          this.download(response.data);
        });
    },
  },
};
</script>
