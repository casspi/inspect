<template>
    <div>
        <div class="result">
            <div class="result-title">
                <h4>{{inspect.inspectName}}</h4>
                <div class="time">
                    <span>采集时间：{{result.inspectionSendTime || '-'}}</span>
                    <span>发布时间：{{ result.inspectionResultTime || '-'}}</span>
                </div>
            </div>
            <div class="result-table-w">
                <table class="result-table">
                    <thead>
                    <tr>
                        <th align="left">项目</th>
                        <th align="left" width="60">结果</th>
                        <th align="left" width="60">单位</th>
                        <th align="left" width="80">参考值</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in result.resultItems" :key="index">
                            <td>{{item.name}}</td>
                            <td class="item-value" :class="computedClass(item)">{{item.value}}</td>
                            <td>{{item.unit || '-'}}</td>
                            <td>{{item.acceptanceValue}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="result-footer">
                <span>{{result.inspectionOffice}}</span>
                <span>检验员：{{result.inspectionPersonal}}</span>
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
  .result {
      margin: 5px auto;
      border: 1px solid #333;
      box-sizing: border-box;
      width: 365px;
    .result-title{
      padding: 0 10px;
      background: #7bf31f59;
        margin-bottom: 8px;

        h4{
        margin: 0;
        height: 30px;
        line-height: 30px;
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
