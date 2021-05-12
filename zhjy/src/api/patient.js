import axios from '../utils/axios'

// 就诊人列表
export function getPatient() {
  return axios.get('/patient/list');
}
//新增就诊人
export function addPatient(params) {
  return axios.post('/patient/add', params)
}
// 删除就诊人
export function delPatient(id) {
  return axios.delete('/patient/del/' + id)
}
// 修改就诊人
export function updatePatinet(params) {
  return axios.put('/patient/edit', params)
}