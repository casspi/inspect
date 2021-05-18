<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="所属医院" prop="hospitalName">
        <el-input
          v-model="queryParams.hospitalName"
          placeholder="请输入所属医院"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医生姓名" prop="doctorName">
        <el-input
          v-model="queryParams.doctorName"
          placeholder="请输入医生姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="医生性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择医生性别" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>-->
      <!-- <el-form-item label="年龄" prop="age">
        <el-input
          v-model="queryParams.age"
          placeholder="请输入年龄"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="医生身份证号" prop="idNumber">
        <el-input
          v-model="queryParams.idNumber"
          placeholder="请输入医生身份证号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="科室类别-字典表" prop="deptType">
        <el-select v-model="queryParams.deptType" placeholder="请选择科室类别-字典表" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="position">
        <el-input
          v-model="queryParams.position"
          placeholder="请输入职务"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职称" prop="jobTitle">
        <el-input
          v-model="queryParams.jobTitle"
          placeholder="请输入职称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务员" prop="salesmanName">
        <el-input
          v-model="queryParams.salesmanName"
          placeholder="请输入业务员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
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
          v-hasPermi="['base:doctor:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['base:doctor:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['base:doctor:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['base:doctor:export']"
        >导出</el-button>
      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="doctorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="所属医院" align="center" prop="hospitalName"/>
      <el-table-column label="医生姓名" align="center" prop="doctorName"/>
      <el-table-column label="医生性别" align="center" prop="sexStr"/>
      <el-table-column label="年龄" align="center" prop="age"/>
      <el-table-column label="医生身份证号" align="center" prop="idNumber" width="200"/>
      <el-table-column label="科室类别" align="center" prop="deptType" :formatter="deptTypeFormat"/>
      <el-table-column label="职务" align="center" prop="position"/>
      <el-table-column label="职称" align="center" prop="jobTitle"/>
      <el-table-column label="联系方式" align="center" prop="phone"/>
      <el-table-column label="业务员" align="center" prop="salesmanName" width="100"/>
      <el-table-column label="医生简介" align="center" prop="summary"/>
      <el-table-column label="状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['base:doctor:edit']"
          >修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-user" @click="go2Recommend(scope.row)">我的推荐</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:doctor:remove']"
          >删除</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleQrCode(scope.row)"
            v-hasPermi="['base:doctor:edit']"
          >二维码下载</el-button>
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

    <!-- 添加或修改医生对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="所属医院" prop="hospitalId" v-if="form.id == undefined" width="200px">
          <el-select v-model="form.hospitalId" placeholder="请选择">
            <el-option
              v-for="dict in hospitalList"
              :key="dict.id"
              :label="dict.hospitalName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生姓名" prop="doctorName">
          <el-input v-model="form.doctorName" placeholder="请输入医生姓名"/>
        </el-form-item>
        <el-form-item label="医生身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入医生身份证号"/>
        </el-form-item>
        <el-form-item label="医生性别">
          <el-select v-model="form.sex" placeholder="请选择" disabled>
            <el-option
              v-for="dict in sexOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" readonly/>
        </el-form-item>
        <el-form-item label="科室类别" prop="deptType">
          <el-select v-model="form.deptType" placeholder="请选择">
            <el-option
              v-for="dict in doctorDepartmentTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" prop="position">
          <el-input v-model="form.position" placeholder="请输入职务"/>
        </el-form-item>
        <el-form-item label="职称" prop="jobTitle">
          <el-input v-model="form.jobTitle" placeholder="请输入职称"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式"/>
        </el-form-item>
        <el-form-item label="业务员" prop="salesmanId">
          <el-select v-model="form.salesmanId" placeholder="请选择">
            <el-option
              v-for="dict in salesmanList"
              :key="dict.id"
              :label="dict.salesmanName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医生简介" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
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
  listDoctor,
  getDoctor,
  delDoctor,
  addDoctor,
  updateDoctor,
  exportDoctor,
  changeDoctorStatus,
  createQrCode
} from "@/api/base/doctor";
import { getSalesmanList } from "@/api/base/salesman";
import { getHospitallist } from "@/api/base/hospital";
import { idnumberValidator } from "@/utils/index";

export default {
  name: "Doctor",
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
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      //科室类别
      doctorDepartmentTypeOptions: [],
      //业务员
      salesmanList: [],

      //医院列表
      hospitalList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 医生表格数据
      doctorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalName: null,
        doctorName: null,
        sex: null,
        age: null,
        idNumber: null,
        deptType: null,
        position: null,
        jobTitle: null,
        phone: null,
        salesmanName: null,
        summary: null,
        status: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      }
    };
  },
  watch: {
    "form.idNumber": function(val) {
      if (idnumberValidator(val)) {
        this.setAgeAndsex(val);
      } else {
        this.form.sex = "";
        this.form.age = "";
      }
    }
  },
  created() {
    this.getList();
    this.getSalesman();
    this.getHospitalData();
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    this.getDicts("doctor_department_type").then(response => {
      this.doctorDepartmentTypeOptions = response.data;
    });
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    setAgeAndsex(value) {
      let myDate = new Date();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let age = myDate.getFullYear() - value.substring(6, 10) - 1;
      if (
        value.substring(10, 12) < month ||
        (value.substring(10, 12) == month && value.substring(12, 14) <= day)
      ) {
        age++;
      }
      this.form.age = age;
      this.form.sex = parseInt(value.substr(16, 1)) % 2 == 1 ? "0" : "1";
    },
    /** 查询医生列表 */
    getList() {
      this.loading = true;
      listDoctor(this.queryParams).then(response => {
        this.doctorList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //业务员信息
    getSalesman() {
      getSalesmanList(this.salesmanName).then(response => {
        this.salesmanList = response.data;
      });
    },

    //医院列表信息
    getHospitalData() {
      getHospitallist(this.hospitalName).then(response => {
        this.hospitalList = response.data;
      });
    },
    // 性别
    deptTypeFormat(row, column) {
      return this.selectDictLabel(
        this.doctorDepartmentTypeOptions,
        row.deptType
      );
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        hospitalId: null,
        doctorName: null,
        sex: null,
        age: null,
        idNumber: null,
        deptType: null,
        position: null,
        jobTitle: null,
        phone: null,
        salesmanId: null,
        summary: null,
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
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 医生状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm(
        "确认要" + text + "<" + row.doctorName + ">医生吗?",
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(function() {
          return changeDoctorStatus(row.id, row.status);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加医生";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDoctor(id).then(response => {
        // console.log(response.data)
        this.form = response.data;
        this.$nextTick(() => {
          this.form.idNumber = response.data.idNumber;
        });
        this.open = true;
        this.title = "修改医生";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDoctor(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDoctor(this.form).then(response => {
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
      this.$confirm('是否确认删除医生编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delDoctor(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有医生数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return exportDoctor(queryParams);
        })
        .then(response => {
          this.download(response.data);
        });
    },
    handleQrCode(row) {
      if (!row.qrCodePath) {
        this.msgSuccess("暂未生成二维码，请刷新列表重新再试..");
        createQrCode(row.id).then(response => {
          row.qrCodePath = response.data;
        });
        return;
      }
      let url = "base/doctor/qrCode/" + row.id;
      this.qrCodeDownload(url);
    },
    go2Recommend(item){
      this.$router.push({path:'/base/myRecommend',query:{doctorId: item.id}})
    }
  }
};
</script>
