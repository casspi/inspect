export { prefix } from './utils'

export function toFixed(val) {
    if (val === null || val === undefined || val === '') {
        return ''
    }
    return Number(val).toFixed(2)
}