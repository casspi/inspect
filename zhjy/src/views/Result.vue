<template>
  <div class="result">
    <div class="result-title">
      <h4>{{inspect.inspectName}}</h4>  
      <div class="time">
        <span>采集时间：2021-5-02 16:38:43</span>
        <span>发布时间：2021-5-12 16:38:43</span>
      </div>
    </div>
    <div class="result-table-w">
      <table class="result-table">
        <thead>
          <tr>
            <th align="left">项目</th>
            <th align="left">结果</th>
            <th align="left">单位</th>
            <th align="left">参考值</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>谷氨酸氨基转移酶</td>
            <td class="item-value low">22</td>
            <td>U/L</td>
            <td>0-40</td>
          </tr>
          <tr>
            <td>谷氨酸氨基转移酶</td>
            <td class="item-value">22</td>
            <td>U/L</td>
            <td>0-40</td>
          </tr>
          <tr>
            <td>尿酸</td>
            <td class="item-value high">380</td>
            <td>umol/L</td>
            <td>90-420</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="result-footer">
      <span>汇昌检验有限公司</span>
      <span>检验员：李时珍</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      inspect: {}
    }
  },
  mounted(){
    this.inspect = JSON.parse(this.$route.query.inspect)
  },
}
</script>

<style lang="less" scoped>
  .result {
    box-sizing: border-box;
    .result-title{
      padding: 0 20px;
      background: #7bf31f59;
      h4{
        margin: 0;
        height: 30px;
        line-height: 30px;
      }
      .time{
        margin:0;
        font-size: 12px;
        margin-bottom: 5px;
        span{
          line-height: 16px;
        }
      }
    }
    .result-table-w{
      padding: 0 20px;
      .result-table{
        width: 100%;
        border: 1px solid #ccc;
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
      margin-top:10px;
      display:flex;
      flex-direction: row;
      justify-content: space-around;
    }
    
  }
</style>
