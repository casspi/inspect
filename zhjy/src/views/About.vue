<template>
  <div class="about">
    <div class="about-body">
      <img class="intro-img" src="//s.yezgea02.com/1604046067055/WechatIMG30231.jpeg" alt="">
      <van-divider :style="{ color: '#1baeae', borderColor: '#1baeae', fontSize: '20px', fontWeight: 500 }">简介</van-divider>
      <div>至本医疗科技（简称“至本医疗”）是一家以领先测序技术为基础、以真实世界大数据为驱动的肿瘤精准医疗公司，致力于为每个患者提供全面准确的分子诊断解决方案，将其与相关的靶向治疗、免疫治疗以及临床试验相匹配，并为制药企业提供“一站式”定制化解决方案，推动中国癌症临床治疗方式的革新。</div>
      <br/>
      <div>至本医疗拥有国际标准的CAP、CLIA双认证实验室和丰富的肿瘤精准诊断产品管线，是中国首家推出DNA+RNA检测的精准医疗公司，业务范围已覆盖中国500多家医院和科研机构。</div> 
      <br/>
      <div>同时，至本医疗作为生物制药企业可信赖的合作伙伴，为抗肿瘤药物提供“一站式”定制化解决方案，实现从新药研发到上市后的全周期精准赋能。</div>
      <br/>
      <div>
        至本医疗拥有中国第一家专注于肿瘤精准治疗的互联网医院，让中国患者在基层就能接受和一线城市一致的肿瘤临床诊疗，为更多患者提供生存获益。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
}
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px;
    .intro-img {
      width: 100%;
    }
    .about-body {
      font-size: 16px;
      a {
        color: #007fff;
      }
    }
  }
</style>
