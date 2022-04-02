import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  Button, Badge, Tabbar, TabbarItem, Skeleton, Icon, TreeSelect, Dialog, Toast, Form,
  Field, Popup, Picker, Tabs, Tab, PullRefresh, List, Card, Cell, ContactCard,
  NoticeBar, Swipe, SwipeItem, Lazyload, RadioGroup, Radio,
  Sticky, Tag, Search, Divider
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
  .use(Divider);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
;(s => s.keys().forEach(k => s(k).default && Vue.use(s(k).default)))(require.context('./plugins', true, /\.js$/));
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
