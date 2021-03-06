import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  Button, Badge, Tabbar, TabbarItem, Skeleton, Icon, TreeSelect, Dialog, Toast, Form,
  Field, Popup, Picker, Tabs, Tab, PullRefresh, List, Card, Cell, ContactCard,
  NoticeBar, Swipe, SwipeItem, Lazyload, RadioGroup, Radio,
  Sticky, Tag, Search, Divider, Empty
} from 'vant'
import '../src/common/style/custom.less'
import * as filters from './common/js/filters'

Vue.config.productionTip = false
Vue.use(Button)
    .use(Badge)
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
  .use(Card)
  .use(Cell)
  .use(ContactCard)
  .use(NoticeBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(RadioGroup)
  .use(Radio)
  .use(Sticky)
  .use(Tag)
  .use(Search)
  .use(Divider)
  .use(Empty);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
;(s => s.keys().forEach(k => s(k).default && Vue.use(s(k).default)))(require.context('./plugins', true, /\.js$/));
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 引入调试能力
const script = document.createElement('script')
//  新版本 console 会把 set、get输出
// script.src = '//cdn.jsdelivr.net/npm/eruda'
script.src = 'https://cdn.bootcss.com/eruda/1.5.2/eruda.min.js'
document.body.appendChild(script)

script.onload = () =>  window.eruda.init()
