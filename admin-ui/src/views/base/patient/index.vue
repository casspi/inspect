<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="120px">
        <el-form-item label="用户" prop="realName">
        <el-input
          v-model="queryParams.realName"
          placeholder="请输入用户姓名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入手机号码"
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

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['base:patient:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['base:patient:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['base:patient:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['base:patient:export']"
        >导出</el-button>
      </el-col> -->
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="list" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="姓名" align="center" prop="realName" />
      <el-table-column label="手机号" align="center" prop="phonenumber" />
      <el-table-column label="身份证" align="center" prop="idNumber" />
      <el-table-column label="用户性别" align="center" prop="sex"  :formatter="sexFormat" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="备注" align="center" prop="remark" />
       <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['base:patient:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:patient:remove']"
          >删除</el-button>
           <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="handleResetPwd(scope.row)"
                v-hasPermi="['system:user:resetPwd']"
              >重置密码</el-button>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-key"
                @click="openPatient(scope.row)"
              >患者信息</el-button>    
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


 <!-- 添加或修改患者对话框 -->
    <el-dialog :title="title" :visible.sync="openPatientFlag" width="1100px" append-to-body :close-on-click-modal='false'>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-table :data="patientList"  border style="line-height: 0">
            <el-table-column label="姓名" align="center" prop="realName" >
              <template slot-scope="scope">
                {{ scope.row.realName }}
              </template>
            </el-table-column>
            <el-table-column label="手机号" align="center" prop="phonenumber" >
              <template slot-scope="scope">
                <el-tag size="small">{{ scope.row.phonenumber }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="身份证号" align="center" prop="idNumber" >
              <template slot-scope="scope">
                {{ scope.row.idNumber }}
              </template>
            </el-table-column>
            <el-table-column label="性别" align="center" prop="sexStr" >
              <template slot-scope="scope">
               {{ scope.row.sexStr }}
              </template>
            </el-table-column>
            <el-table-column label="年龄" align="center" prop="age" >
              <template slot-scope="scope">
               {{ scope.row.age }}
              </template>
               </el-table-column>
              <el-table-column label="添加时间" align="center" prop="createTime" >
              <template slot-scope="scope">
               {{ scope.row.createTime }}
              </template>
            </el-table-column>
          </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPatient">关 闭</el-button>
      </div>
    </el-dialog>


    <!-- 添加或修改患者对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="身份证id" prop="idNumber">
          <el-input v-model="form.idNumber" placeholder="请输入身份证id" />
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择用户性别">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
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
import { listPatient, getPatient, delPatient, addPatient, updatePatient, exportPatient,listUser,listByUserId } from "@/api/base/patient";
import { resetUserPwd,delUser } from "@/api/system/user";

export default {
  name: "Patient",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
       // 性别状态字典
      sexOptions: [],
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      list:[],//用户列表
      // 患者表格数据
      patientList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //查看患者详情
      openPatientFlag:false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        realName: null,
        phonenumber: null,
        idNumber: null,
        registerPhonenumber: null,
        registerName: null,
        sex: null,
        // age: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_user_sex").then(response => {
    this.sexOptions = response.data;
    });
  },
  methods: {
    /** 查询患者列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        this.list = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //根据注册人主键获取患者信息
     getPatientList(val) {
      this.loading = true;
      listByUserId(val).then(response => {
        this.patientList = response.data;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },

    // 取消按钮
    cancelPatient() {
      this.openPatientFlag = false;
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        realName: null,
        phonenumber: null,
        idNumber: null,
        sex: null,
        age: null,
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
           // 性别
    sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
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
      this.title = "添加患者";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPatient(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改患者";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePatient(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPatient(this.form).then(response => {
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
      const names = row.realName || this.names;
      this.$confirm('是否确认删除用户为"' + names + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUser(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有患者数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPatient(queryParams);
        }).then(response => {
          this.download(response.data);
        })
    },
      /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.realName + '"的新密码', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
          resetUserPwd(row.id, value).then(response => {
            this.msgSuccess("修改成功，新密码是：" + value);
          });
        }).catch(() => {});
    },

      /** 重置密码按钮操作 */
    openPatient(row) {
      this.getPatientList(row.id);
      this.openPatientFlag =true;
    },
  }
};
</script>
