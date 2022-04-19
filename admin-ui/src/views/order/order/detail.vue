<template>
  <div class="app-container">
    <el-form ref="detailForm" :model="orderDetail" label-position="right" label-width="120px" class="spHeight">
        <el-form-item label="订单编号">
          {{ orderDetail.number }}
        </el-form-item>
         <el-row>
         <el-col :span="12">
            <el-form-item label="支付状态:">
              {{ orderDetail.payStatus | parsePayStatus }}
            </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="支付时间:">
              {{ orderDetail.payTime }}
        </el-form-item>
        </el-col>
      <el-col :span="12">
            <el-form-item label="应收金额：">
              {{ orderDetail.amount }}元
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实付金额：">
              {{ orderDetail.actualAmount }}元
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单医院：">
              {{ orderDetail.hospitalName }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开单医生：">
              {{ orderDetail.doctorName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="检验项目：">
          <el-table :data="orderDetail.itemList"  border style="line-height: 0">
            <el-table-column label="检验编号" align="center" prop="inspectionNumber" >
              <template slot-scope="scope">
                {{ scope.row.inspectionNumber }}
              </template>
            </el-table-column>
            <el-table-column label="项目名称" width="220" align="center" prop="inspectName" >
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
            <el-table-column label="应收" align="center" prop="amount" >
              <template slot-scope="scope">
               {{ scope.row.amount }}元
              </template>
               </el-table-column>
              <el-table-column label="实收" align="center" prop="actualAmount" >
              <template slot-scope="scope">
               {{ scope.row.actualAmount }}元
              </template>
               </el-table-column>
            <el-table-column label="状态" align="center" >
                <template slot-scope="scope" v-if="scope.row.inspectionStatus==1||scope.row.inspectionStatus==6">
                  <el-link title="查看检验情况" type="primary" @click="openResultHandle(scope.row)">
                    {{ scope.row.inspectionStatusStr}}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="送检时间" align="center" prop="inspectionSendTime">
             <template slot-scope="scope">
                {{ scope.row.inspectionSendTime }}
              </template>
            </el-table-column>
             <el-table-column label="检验结果时间" align="center" prop="inspectionResultTime">
             <template slot-scope="scope">
                {{ scope.row.inspectionResultTime }}
              </template>
            </el-table-column>
            <el-table-column label="检验结果" align="center" prop="inspectionResultTime">
              <template slot-scope="scope">
                <el-button size="small" @click="handleResultPop(scope.row)">录入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-tag size="small" v-for="(item,index) in orderDetail.itemList" :key="index">{{item.inspectName}}<span>{{item.inspectionStatus | parseInspectionStatus}}</span></el-tag> -->
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
      <inspectin-result ref="refInspectinResult"></inspectin-result>
  </div>
</template>

<script>
import { getOrder } from "@/api/order/order";
 import inspectinResult from "../components/inspectinResult"

export default {
  name: "OrderItem",
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
      // 订单条目表格数据
      orderItemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,

      orderDetail: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderId: null,
        inspectionItemId: null,
        amount: null,
        actualAmount: null,
        discountPercent: null,
        discountAmount: null,
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
    const id = this.$route.params && this.$route.params.id;
    this.getDetail(id);
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
          text = "已取消";
          break;
        default:
          break;
      }
      return text;
    },
  },
  methods: {
       /** 查看订单详情 */
    getDetail(id) {
      getOrder(id).then((response) => {
        this.orderDetail = response.data;
      });
    },
   //检查结果详情
    openResultHandle(row){
        console.log(row);
    },
    //打开录入弹框
    handleResultPop(data) {
      console.log(data.id);
      this.$refs.refInspectinResult.show(data.id)
    }
  },
  components: {
    inspectinResult
  }
};
</script>
