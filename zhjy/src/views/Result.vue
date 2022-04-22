<template>
    <div>
        <div class="result-title_0" >
          <h2>检验结果</h2>
        </div>
        <div class="result-w">
            <div class="result-title">
                <h4 class="result">检验结果:{{'阳性'}}</h4>
                <h4 class="name">{{inspect.inspectName}}</h4>
                <div class="time">
                    <span>检验编号：{{result.inspectionNumber || '-'}}</span>
                    <span>采集时间：{{result.inspectionSendTime || '-'}}</span>
                    <span>发布时间：{{ result.inspectionResultTime || '-'}}</span>
                </div>
            </div>
            <div class="result-table-w">
                <table class="result-table">
                    <thead>
                    <tr>
                        <th align="left">项目</th>
                        <th align="left" width="80">结果</th>
                        <th align="right" width="100">参考值</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in result.resultItems" :key="index">
                            <td>{{item.name}}</td>
                            <td align="left" class="item-value" :class="computedClass(item)">{{item.value}}</td>
                            <td align="right">{{item.acceptanceValue}}{{item.unit || ''}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="result-footer">
                <span>{{result.inspectionOffice}}</span>
                <span>检验员：{{result.inspectionPersonal}}</span>
            </div>
            <div class="result-footer" style="color:red;">
                 <span>检验结果：{{ result.result || '-'}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getResult } from "@/api/order";
export default {
    data() {
        return {
            inspect: {},
            result: {}
        }
    },
    computed:{
      computedClass(){
          return (item) => {
              const classs = {
                  '1': 'low',
                  '2': '',
                  '3': 'high'
              }
              return classs[item.result]
          }
      }
    },
    mounted(){
        this.inspect = JSON.parse(this.$route.query.inspect)
         console.log(this.inspect);
        this.getResult()
    },
    methods:{
        async getResult(){
            const res = await getResult(this.inspect.id)
            if(res.code == 200){
                this.result = res.data
            }
            console.log(res);
        }
    }
}
</script>

<style lang="less" scoped>

  .result-title_0{
     h2{
        text-align: center;
        align-content: center;
        height: 15px;
        line-height: 30px;
    }
   }
  .result-w {
      margin: 5px auto;
      border: 1px solid #333;
      box-sizing: border-box;
      width: 365px;
      font-size: 13px;
    .result-title{
        padding: 0 10px;
        background: #7bf31f59;
        margin-bottom: 8px;
        .result{
            margin: 0;
            line-height: 20px;
            padding-top: 5px;
        }
        .name{
            margin: 0;
            height: 20px;
            line-height: 20px;
        }
      .time{
        margin:0;
        font-size: 12px;
          display: flex;
          flex-direction: column;
          padding-bottom: 5px;
        span{
            flex: 1;
          line-height: 16px;
        }
      }
    }
    .result-table-w{
      padding: 0 10px;
      .result-table{
        width: 100%;

        table-layout: fixed;
        thead tr{
          color: #999
        }
        tbody{
          td.item-value{
            &.high{
              color: red;
              &:after{
                content:'  ↑'
              }
            }
            &.low{
              color: red;
              &:after{
                content:'  ↓'
              }
            }
          }
        }
      }
    }
    .result-footer{
      margin:6px 0;
      display:flex;
      flex-direction: row;
      justify-content: space-around;
    }

  }
</style>
