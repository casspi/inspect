<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分类名称" prop="classifyName">
        <el-input
          v-model="queryParams.classifyName"
          placeholder="请输入分类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否推荐" prop="recommend">
       <el-select
          v-model="queryParams.recommend"
            placeholder="是否推荐"
            clearable
            size="small"
            style="width: 240px"
        >
        <el-option
          v-for="dict in recommendOptions"
          :key="dict.id"
          :label="dict.name"
          :value="dict.id"
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
          v-hasPermi="['base:inspectionItemClassify:add']"
        >新增</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inspectionItemClassifyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
              prop="titleImg"
              label="简图"
              width="80"
              align="center"
            >
          <template slot-scope="scope">
              <el-image
                  style="width: 80px; height: 80px"
                  :src="getImgUrl(scope.row.titleImg)"
                  :preview-src-list="[getImgUrl(scope.row.titleImg)]">
              </el-image>
          </template>
        </el-table-column>
      <el-table-column label="分类名称" align="center" prop="classifyName" />
      <el-table-column label="状态" align="center" prop="status" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否推荐" align="center" prop="recommend" >
         <template slot-scope="scope">
          <el-switch
            v-model="scope.row.recommend"
            :active-value=2
            :inactive-value=1
            @change="handleRecommendChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="orderNum" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['base:inspectionItemClassify:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:inspectionItemClassify:remove']"
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="82px" v-if = "open">
        <el-form-item label="分类名称" prop="classifyName">
          <el-input v-model="form.classifyName" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="介绍" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容" />
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
        <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
       <el-form-item label="预览缩略图" prop="titleImg">
          <el-upload
            :action="imgUpload.url"
            :headers="imgUpload.headers"
            list-type="picture-card"
            :limit="limit"
            :on-exceed="handleExceed"
            :on-change="handleEditChange"
            :on-remove="handleRemove"
            :on-success="handlePictureSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
            :class="{ hide: hideUploadBtn }"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" :modal="false">
            <img width="100%" v-if="imageUrl" :src="imageUrl"  alt="">
          </el-dialog>
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
import { listInspectionItemClassify, getInspectionItemClassify, delInspectionItemClassify, addInspectionItemClassify, updateInspectionItemClassify, exportInspectionItemClassify,changeStatus,changeRecommend } from "@/api/base/inspectionItemClassify";
import Editor from '@/components/Editor';
import { getToken } from '@/utils/auth'
export default {
  name: "InspectionItemClassify",
  components: { Editor },
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
      // 状态数据字典
      statusOptions: [],
      //推荐列表
      recommendOptions: [{
        'id':1,
         name:"正常"
      },{
        'id':2,
         name:"推荐"
      }],
      titleImg:'',
      // 总条数
      total: 0,
      // 检验项目信息表格数据
      inspectionItemClassifyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      limit: 1,
      dialogVisible: false,
      //页面上存的暂时图片地址List
      fileList: [],
      //图片地址
      imageUrl: "",
      imgUpload: {
          // 设置上传的请求头部
          headers: {
            Authorization: "Bearer " + getToken()
          },
          // 图片上传的方法地址:
          url: process.env.VUE_APP_BASE_API + "/common/upload"
      },
      hideUploadBtn: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        classifyName: null,
        summary: null,
        titleImg: null,
        status: null,
        recommend: null,
        content: null
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
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getList();
  },
  methods: {
    /** 查询检验项目信息列表 */
    getList() {
      this.loading = true;
      listInspectionItemClassify(this.queryParams).then(response => {
        this.inspectionItemClassifyList = response.rows;
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
        classifyName: null,
        summary: null,
        titleImg: null,
        status: "0",
        recommend: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        content: null
      };
      this.resetForm("form");
      this.fileList=[];
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
      this.hideUploadBtn =false;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.fileList = [];
      this.imageUrl = "";
      let _this = this;
      this.reset();
      const id = row.id || this.ids
      getInspectionItemClassify(id).then(response => {
        this.form = response.data;
        _this.imageUrl = this.form.titleImg;
        if (this.imageUrl == null || this.imageUrl == '') {
          _this.hideUploadBtn = false;
          _this.imageUrl = "";
        } else {
           _this.fileList = [];
          _this.fileList.push({ name: 'food.jpg', url: _this.getImgUrl(_this.form.titleImg) });
          _this.hideUploadBtn = true;
        }
        this.title = "修改检验项目信息";
        this.open = true;
      });
      console.log(this.fileList);
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.titleImg = this.imageUrl;
          if (this.form.id != null) {
            updateInspectionItemClassify(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInspectionItemClassify(this.form).then(response => {
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
      this.$confirm('是否确认删除此检验项目?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delInspectionItemClassify(ids);
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
          return exportInspectionItemClassify(queryParams);
        }).then(response => {
          this.download(response.data);
        })
    },
        // 状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要' + text + '<' + row.classifyName + '>吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeStatus(row.id, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },

    // 是否推荐
    handleRecommendChange(row) {
      let text = row.recommend === 1 ? "关闭推荐" : "推荐";
      this.$confirm('确认要' + text + '<' + row.classifyName + '>吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRecommend(row.id, row.recommend);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.recommend === 1 ? 1 : 2;
        });
    },
     //图片上传前的相关判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type == 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    //图片预览
    handlePictureCardPreview(file) {
      this.imageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片上传成功后的回调
    handlePictureSuccess(res, file) {
      //设置图片访问路径 （articleImg 后台传过来的的上传地址）
      this.imageUrl = file.response.data.fileName;
      // this.fileList.push({'url':this.imageUrl});
      //console.log(this.fileList);
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`上传链接LOGO图片数量不能超过 ${this.limit} 个!`);
    },
    // 移除图片操作
    handleRemove(file, fileList) {
      // fileList为移除后剩余的图片数组 赋值给this.fileList 则展示正确
      // 上传图片 > 6 则隐藏上传组件
      this.imageUrl = "";
      this.hideUploadBtn = false;
    },

    // 最多上传6张图，超过时隐藏上传按钮
    handleEditChange(file, fileList) {
      this.hideUploadBtn = fileList.length >= 1;
      console.log(this.hideUploadBtn);
    },
   // 图片全路径
  getImgUrl(titleImg){
   return process.env.VUE_APP_BASE_API + '/common/download/resource?name='+titleImg
  },
  }
};
</script>
<style lang="scss" scoped>
.btn-bar{
    text-align: center;
}
/deep/ .ql-container.ql-snow {
    line-height: normal !important;
    min-height: 200px !important;
}
// 隐藏上传组件
/deep/ .hide {
  .el-upload--picture-card {
    display: none !important;
  }
}
/deep/ .el-table__fixed-body-wrapper {
    z-index: auto !important;
}
</style>
