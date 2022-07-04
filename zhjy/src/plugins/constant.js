export const BASE_URL = 'https://gl.huichangyx.com/prod-api/'

export const constant = {
    BASE_URL
}

export default {
    install (Vue) {
        Vue.prototype.$constant = constant
    }
}