import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'check',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Check.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/create-order',
    name: 'create-order',
    component: () => import('@/views/CreateOrder.vue')
  },
  {
    path: '/order-detail',
    name: 'order-detail',
    component: () => import('@/views/OrderDetail.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/Recommend.vue')
  },
  {
    path: '/patient',
    name: 'patient',
    component: () => import('@/views/Patient.vue')
  },
  {
    path: '/doctor',
    name: 'doctor',
    component: () => import('@/views/Doctor.vue')
  },
  {
    path: '/patient-edit',
    name: 'patient-edit',
    component: () => import('@/views/PatientEdit.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/Result.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      index: 1
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
