import { filterMessage } from "@/common/js/utils";
import { Toast } from "vant";

const exclude = ['', 'cancel', 'undefined']
export default {
    install (Vue) {
        Vue.config.errorHandler = function (err) {
            console.error('err => ', err)
            const message = filterMessage(err)
            if (!exclude.includes(message)) {
                Toast.clear(true) // 注意: 这里不能删除哦
                Toast(message)
            }
        }
    }
}
