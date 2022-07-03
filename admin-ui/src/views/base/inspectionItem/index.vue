<template>
  <div class="app-container">
    <div v-show="!open">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="100px">
            <el-form-item label="检验项目名称" prop="itemName">
                <el-input
                    v-model="queryParams.itemName"
                    placeholder="请输入检验项目名称"
                    clearable
                    size="small"
                    @keyup.enter.native="handleQuery"
                />
            </el-form-item>
            <el-form-item label="检验项目分类" prop="classifyId">
                <el-select
                    v-model="queryParams.classifyId"
                    placeholder="检验项目分类"
                    clearable
                    size="small"
                    style="width: 240px"
                >
                    <el-option
                        v-for="dict in classifyIdOptions"
                        :key="dict.id"
                        :label="dict.classifyName"
                        :value="dict.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="样本类型" prop="sampleType">
                <el-select
                    v-model="queryParams.sampleType"
                    placeholder="样本类型"
                    clearable
                    size="small"
                    style="width: 240px"
                >
                    <el-option
                        v-for="dict in sampleTypeOptions"
                        :key="dict.dictValue"
                        :label="dict.dictLabel"
                        :value="dict.dictValue"
                    />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="单位" prop="itemUnit">
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
            </el-form-item> -->
            <!-- <el-form-item label="折扣百分比" prop="discountPercent">
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
            </el-form-item> -->
            <!-- <el-form-item label="检验所主键" prop="inspectionOfficeId">
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
            </el-form-item> -->
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
                    v-hasPermi="['base:inspection:add']"
                >新增</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
                <el-button
                    type="success"
                    icon="el-icon-edit"
                    size="mini"
                    :disabled="single"
                    @click="handleUpdate"
                    v-hasPermi="['base:inspection:edit']"
                >修改</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    :disabled="multiple"
                    @click="handleDelete"
                    v-hasPermi="['base:inspection:remove']"
                >删除</el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-button
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    @click="handleExport"
                    v-hasPermi="['base:inspection:export']"
                >导出</el-button>
            </el-col> -->
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <el-table v-loading="loading" :data="inspectionItemList" @selection-change="handleSelectionChange" style="width:110%">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              prop="titleImg"
              label="图片"
              align="center"
              fixed
              width="80"
            >
              <template slot-scope="scope">
                  <el-image
                      style="max-width: 80px; height: 50px;font-size: 12px;"
                      :src="getImgUrl(scope.row.titleImg)"
                      :preview-src-list="[getImgUrl(scope.row.titleImg)]">
                  </el-image>
              </template>
            </el-table-column>
            <el-table-column label="检验项目名称" align="left" header-align="center" prop="itemName" fixed width="200" min-width="120"/>
            <el-table-column label="检验项目分类" align="left" header-align="center" prop="classifyName" width="120"/>
            <el-table-column label="样本类型" align="left" header-align="center" prop="sampleTypeStr" />
            <el-table-column label="单位" align="center" header-align="center" prop="itemUnit" />
            <el-table-column label="价格" align="center" prop="amount" />
            <!-- <el-table-column label="折扣百分比" align="center" prop="discountPercent" /> -->
            <el-table-column label="折扣金额" align="center" header-align="center" prop="discountAmount" />
            <el-table-column label="排序" align="center" prop="orderNum" />
            <el-table-column label="状态" align="center">
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
            <el-table-column label="是否发布" align="center" prop="publish" >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.publish"
                  :active-value=2
                  :inactive-value=1
                  @change="handlePublishChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="检验所" align="left" header-align="center" prop="officeName" width="200" />
            <el-table-column label="检验所项目" align="left" header-align="center" prop="officeItemName" width="200" />
            <el-table-column label="检验项目介绍" align="left" header-align="center" prop="summary" width="300"/>
            <el-table-column label="备注" align="left" header-align="center" prop="remark" />
            <el-table-column label="操作" align="left" header-align="center" class-name="small-padding fixed-width" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['base:inspection:edit']"
                    >修改</el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['base:inspection:remove']"
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
    </div>

    <!-- 添加或修改检验项目信息对话框 -->
    <div v-if="open">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
         <el-row>
        <el-col :span="6">
        <el-form-item label="检验项目名称" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入检验项目名称" />
        </el-form-item>
        </el-col>
       <el-col :span="6">
        <el-form-item label="检验项目分类" prop="classifyId">
          <el-select v-model="form.classifyId" placeholder="请输入检验项目分类" >
            <el-option
              v-for="dict in classifyIdOptions"
              :key="dict.id"
              :label="dict.classifyName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
         </el-col>
        <el-col :span="6">
        <el-form-item label="样本类型" prop="sampleType">
          <el-select v-model="form.sampleType" placeholder="请选择样本类型" >
            <el-option
              v-for="dict in sampleTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
        <el-form-item label="单位" prop="itemUnit">
          <el-input v-model="form.itemUnit" placeholder="请输入单位" />
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="价格" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入价格" />
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <!-- <el-form-item label="折扣百分比" prop="discountPercent">
          <el-input v-model="form.discountPercent" placeholder="请输入折扣百分比" />
        </el-form-item> -->
        <el-form-item label="折扣金额" prop="discountAmount">
          <el-input v-model="form.discountAmount" placeholder="请输入折扣金额" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row>
         <el-col :span="6">
      <el-form-item label="检验所" prop="inspectionOfficeId">
          <el-select v-model="form.inspectionOfficeId" placeholder="请选择检验所" @change="inspectionOfficeItemChange(form.inspectionOfficeId,null)">
            <el-option
              v-for="dict in inspectionOfficeList"
              :key="dict.id"
              :label="dict.officeName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="6">
        <el-form-item label="检验所项目" prop="inspectionOfficeItemId">
           <el-select v-model="form.inspectionOfficeItemId" placeholder="请选择检验所项目" >
            <el-option
              v-for="dict in inspectionOfficeItemList"
              :key="dict.id"
              :label="dict.itemName"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
         <el-col :span="6">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-col>
        <el-col :span="6">
         <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0"  style="width: 100px" />
          </el-form-item>
        </el-col>
        </el-row>
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
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" v-if="imageUrl" :src="imageUrl"  alt="">
              </el-dialog>
            </el-form-item>
        <el-form-item label="检验项目介绍" prop="summary">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="富文本">
            <quill-editor
                ref="myQuillEditor"
                myEditor="Editorc0"
                v-model="form.content"
            />
        </el-form-item>
      </el-form>
      <div class="btn-bar">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { listInspectionItem, getInspectionItem, delInspectionItem, addInspectionItem, updateInspectionItem, exportInspectionItem,changeStatus,changeRecommend,changePublish } from "@/api/base/inspectionItem";
import { getInspectionOfficeList } from "@/api/base/inspectionOffice";
import { getListByInspectionOfficeId } from "@/api/base/inspectionOfficeItem";
import { checkAmount }from "@/utils/index";
import { listInspectionItemClassify} from "@/api/base/inspectionItemClassify";
import quillEditor from './quillEditor'
import { getToken } from '@/utils/auth'

export default {
  name: "InspectionItem",
  components: {
    quillEditor
  },
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
      // 总条数
      total: 0,
      // 检验项目信息表格数据
      inspectionItemList: [],
      //检验所
      inspectionOfficeList: [],
      //检验所项目
      inspectionOfficeItemList: [],
      //样本类型
      sampleTypeOptions: [],

    //样本分类
      classifyIdOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 图片数量限制
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
        itemName: null,
        classifyId: null,
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
      form: {
          content: ''
      },
      // 表单校验
      rules: {
        status: [
          { required: true, message: "状态不能为空", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "检验项目不能为空", trigger: "blur" }
        ],
        classifyId: [
          { required: true, message: "项目分类不能为空", trigger: "blur" }
        ],
        sampleType: [
          { required: true, message: "样本类型不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "价格不能为空", trigger: "blur" },
          { validator: checkAmount, trigger: "blur" }
        ],
        discountAmount: [
          { required: true, message: "折扣金额不能为空", trigger: "blur" },
           { validator: checkAmount, trigger: "blur" }
        ],
        inspectionOfficeId: [
          { required: true, message: "检验所不能为空", trigger: "blur" }
        ],
        inspectionOfficeItemId: [
          { required: true, message: "检验所项目不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.listInspectionItemClassifyData();
    this.getList();
    this.inspectionOfficeData();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("inspect_sample_type").then(response => {
      this.sampleTypeOptions = response.data;
    });
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
        classifyId: null,
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
        titleImg: null,
        remark: null,
        content: '',
      };
      this.resetForm("form");
      this.fileList=[];
    },
            // 状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要' + text + '<' + row.itemName + '>项目吗?', "警告", {
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
      this.hideUploadBtn =false;
      this.title = "添加检验项目信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.fileList = []
      this.reset();
      let _this = this;
      const id = row.id || this.ids
      getInspectionItem(id).then(response => {
        this.form = response.data;
        this.open = true;
        _this.imageUrl = this.form.titleImg;
        if(this.imageUrl==null || this.imageUrl == ''){
          _this.hideUploadBtn =false;
          _this.imageUrl = "";
        }else{
          _this.fileList.push({name: 'food.jpg', url: _this.getImgUrl(_this.form.titleImg)});
          _this.hideUploadBtn =true;
        }
        this.title = "修改检验项目信息";
        _this.inspectionOfficeItemChange(response.data.inspectionOfficeId,this.form.inspectionOfficeItemId);
      });
        console.log(this.fileList);
    },

    /** 检验所列表 */
    inspectionOfficeData() {
      this.inspectionOfficeItemList = [];
      getInspectionOfficeList().then(response => {
        this.inspectionOfficeList = response.data;
      });
    },
        /** 修改按钮操作 */
    inspectionOfficeItemChange(id,itemId) {
      let _this= this;
      if(itemId==null){
        this.form.inspectionOfficeItemId = ''
      }
      getListByInspectionOfficeId(id).then(response => {
        _this.inspectionOfficeItemList = response.data;
        if(itemId!=null){
        _this.inspectionOfficeItemId=itemId;
        }
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
           this.form.titleImg = this.imageUrl;
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
        /** 项目分类 */
     listInspectionItemClassifyData() {
      this.classifyIdOptions = [];
      listInspectionItemClassify().then(response => {
      this.classifyIdOptions = response.rows;
      console.log("项目分类  ",response.rows);
      });
    },
          // 是否推荐
  handleRecommendChange(row) {
      let text = row.recommend === 1 ? "关闭推荐" : "推荐";
      this.$confirm('确认要' + text + '<' + row.itemName + '>吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRecommend(row.id, row.recommend);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.recommend = row.recommend === 1 ? 1 : 2;
        });
    },

  // 是否发布
  handlePublishChange(row) {
      let text = row.publish === 1 ? "下架" : "发布";
      this.$confirm('确认要' + text + '<' + row.itemName + '>吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changePublish(row.id, row.publish);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.publish = row.publish === 1 ? 1 : 2;
        });
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
  getImgUrl(titleImg){
   return process.env.VUE_APP_BASE_API + '/common/download/resource?name='+titleImg
  }
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

