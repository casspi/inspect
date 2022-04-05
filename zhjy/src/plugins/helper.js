import * as helper from '@/common/js/helper'

export default {
    install (Vue) {
        Vue.prototype.$helper = helper
    }
}
