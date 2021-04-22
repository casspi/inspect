import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Tabbar, TabbarItem, Skeleton, Icon, TreeSelect, Dialog, Toast, Form, Field, Popup, Picker, Tabs, Tab, PullRefresh, List, Card }  from 'vant'
import '../src/common/style/custom.less'
import * as filters from './common/js/filters'

Vue.config.productionTip = false
Vue.use(Button)
  .use(Icon)
  .use(Skeleton)
  .use(Tabbar)
  .use(TabbarItem)
  .use(TreeSelect)
  .use(Dialog)
  .use(Toast)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(Tabs)
  .use(Tab)
  .use(PullRefresh)
  .use(List)
  .use(Card);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
