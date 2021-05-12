import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import {
  Button, Tabbar, TabbarItem, Skeleton, Icon, TreeSelect, Dialog, Toast, Form,
  Field, Popup, Picker, Tabs, Tab, PullRefresh, List, Card, Cell, ContactCard,
  NoticeBar, Swipe, SwipeItem, Lazyload, RadioGroup, Radio,
  Sticky, Tag, Search
} from 'vant'
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
  .use(Search);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
