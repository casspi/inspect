import axios from '../utils/axios'

// /hospital/getHospitalList
// 医院列表
export function getHospitalList(params) {
  console.log(params)
  return axios.get('hospital/getHospitalList', { params })
}

//医生列表
export function getDoctorList(params) {
  console.log(params)
  return axios.get('/hospital/getDoctorList', { params })
}

//业务员-医生列表
export function salesmanDoctorList(params) {
  console.log(params)
  return axios.get('/hospital/salesmanDoctorList', { params })
}

//医生详情
export function doctorInfo(id) {
  return axios.get('/hospital/doctor/getInfo/'+id);
}


