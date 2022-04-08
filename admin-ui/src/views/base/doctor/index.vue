<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
     <el-form-item label="所属医院" prop="hospitalId">
        <el-select v-model="queryParams.hospitalId" placeholder="请选择医院" clearable size="small">
         <el-option
            v-for="dict in hospitalOptions"
            :key="dict.id"
            :label="dict.hospitalName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="doctorName">
        <el-input
          v-model="queryParams.doctorName"
          placeholder="请输入姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="queryParams.sex" placeholder="请选择性别" clearable size="small">
          <el-option
            v-for="dict in sexOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input
          v-model="queryParams.idNumber"
          placeholder="请输入身份证号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="科室类别" prop="deptType">
        <el-select v-model="queryParams.deptType" placeholder="请选择类别" clearable size="small">
         <el-option
            v-for="dict in departmentTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入联系方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
       <el-form-item label="业务员" prop="salesmanId">
       <el-select v-model="queryParams.salesmanId" placeholder="请选择业务员" clearable size="small">
         <el-option
            v-for="dict in salesmanOptions"
            :key="dict.id"
            :label="dict.realName"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
              v-model="queryParams.status"
              placeholder="状态"
              clearable
              size="small"
            >
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
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['base:doctor:remove']"
        >删除</el-button>
      </el-col> -->
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
      <el-table-column label="所属医院" align="center" prop="hospitalName" width="200"/>
      <el-table-column label="姓名" align="center" prop="doctorName"/>
      <el-table-column label="登录手机号" align="center" prop="phonenumber" width="150"/>
      <el-table-column label="身份证号" align="center" prop="idNumber" width="200"/>
     <el-table-column label="科室类别" align="center" prop="deptType" :formatter="departmentTypeFormat" />
      <el-table-column label="职务" align="center" prop="position"/>
      <el-table-column label="职称" align="center" prop="jobTitle"/>
      <el-table-column label="业务员" align="center" prop="salesmanName" width="100"/>
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
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:doctor:remove']"
          >删除</el-button>-->
          <el-button 
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleQrCode(scope.row)"
            v-hasPermi="['base:doctor:edit']"
          >二维码下载</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-key"
            @click="handleResetPwd(scope.row)"
            v-hasPermi="['system:user:resetPwd']"
            >重置密码</el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="手机号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入登录帐号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.id == undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
         <el-col :span="12">
             <el-form-item label="业务员" prop="salesmanId">
          <el-select v-model="form.salesmanId" placeholder="请选择业务员" clearable size="small">
         <el-option
            v-for="dict in salesmanOptions"
            :key="dict.id"
            :label="dict.realName"
            :value="dict.id"
          />
        </el-select>
        </el-form-item>
        </el-col>  
        <el-col :span="12">
         <el-form-item label="所属医院" prop="hospitalId">
         <el-select v-model="form.hospitalId" placeholder="请选择医院" size="small">
         <el-option
            v-for="dict in hospitalOptions"
            :key="dict.id"
            :label="dict.hospitalName"
            :value="dict.id"
          />
        </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="7">
        <el-form-item label="姓名" prop="doctorName">
          <el-input v-model="form.doctorName" placeholder="请输入姓名" />
        </el-form-item>
        </el-col>
          <el-col :span="9">
            <el-form-item label="性别" prop="sex" size="small">
            <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option
            v-for="dict in sexOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-select>
        </el-form-item>
          </el-col >
          <el-col :span="7">
          <el-form-item label="年龄" prop="age"  >
          <el-input v-model="form.age" placeholder="请输入年龄" size="small" />
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证号" />
        </el-form-item>
        <!-- <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系方式" />
        </el-form-item> -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="科室类别" prop="deptType">
          <el-select v-model="form.deptType" placeholder="请选择科室类别">
             <el-option
            v-for="dict in departmentTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="10">
          <el-form-item label="状态">
          <el-select
              v-model="form.status"
              placeholder="状态"
              clearable
              size="small"
            >
          <el-option
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
          />
            </el-select>
          </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="职务" prop="position">
          <el-input v-model="form.position" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="职称" prop="jobTitle">
          <el-input v-model="form.jobTitle" placeholder="请输入职称" />
        </el-form-item>
        <el-form-item label="医生简介" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容" />
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
import { getHospitalList } from "@/api/base/hospital";
import { resetUserPwd,getSalesmanList} from "@/api/system/user";
import { idnumberValidator,checkIdNum,checkMobile } from "@/utils/index";

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
      //医院列表
      hospitalList: [],
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 医生表格数据
      doctorList: [],
      //性别
      sexOptions:[],
      //科室类型
      departmentTypeOptions:[],
      //业务员
      salesmanOptions:[],
      //医院
      hospitalOptions:[],
      // 状态数据字典
      statusOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 默认密码
      initPassword: undefined,
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
        userName: [{ required: true, message: "登录手机号不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        doctorName: [{ required: true, message: "医生姓名不能为空", trigger: "blur" }],
        salesmanId: [{ required: true, message: "业务员不能为空", trigger: "blur" }],
        // idNumber: [{ required: true, message: "身份证号不能为空", trigger: "blur" },
        // { validator: checkIdNum, trigger: 'blur'}],
        age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" },
        { validator: checkMobile, trigger: 'blur'}],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
        hospitalId: [{ required: true, message: "所属医院不能为空", trigger: "blur" }],
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
   this.getDicts("sys_user_sex,doctor_department_type,sys_normal_disable").then(response => {
      this.sexOptions = response.data['sys_user_sex'];
      this.departmentTypeOptions = response.data['doctor_department_type'];
      this.statusOptions = response.data['sys_normal_disable'];
    });
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
    this.getSalesmanList(); //获取业务员列表
    this.getHospitalList();//获取医院列表
    this.getList();
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
      this.form.password = this.initPassword;
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
    },
     // 性别
   sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
    },
    // 科室类别
   departmentTypeFormat(row, column) {
      return this.selectDictLabel(this.departmentTypeOptions, row.deptType);
    },
    // 业务员
   getSalesmanList() {
      getSalesmanList().then(response => {
        this.salesmanOptions = response.data;
      });
    },
    // 医院
   getHospitalList() {
      getHospitalList({'status':'0'}).then(response => {
        this.hospitalOptions = response.data;
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.doctorName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
          resetUserPwd(row.id, value).then(response => {
            this.msgSuccess("修改成功，新密码是：" + value);
          });
        }).catch(() => {});
    },
  }
};
</script>
