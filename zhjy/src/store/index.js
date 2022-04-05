import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import {getUserInfo as getUserInfoApi} from '../api/user'
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters: {
        userInfo: state => {
            if (!state.userInfo) {
                state.userInfo = JSON.parse(localStorage.getItem('userData'))
            }
            return state.userInfo
        },
    },
    mutations: {
        setUserInfo(state, data) {
            state.userInfo = data
            localStorage.setItem('userData', JSON.stringify(data))
        },
    },
    actions: {
        async updateUserInfo(context) {
            const { data } = await getUserInfoApi()
            console.log(data)
            context.commit('setUserInfo', data.user)
        },
    }
})
