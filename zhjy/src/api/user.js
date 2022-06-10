import axios from '../utils/axios'

export function getUserInfo() {
  return axios.get('/getInfo');
}

export function EditUserInfo(params) {
  return axios.put('/user/info', params);
}
// 修改密码
export function resetPwd(params) {
  return axios.put('/user/resetPwd', params);
}
export function login(params) {
  return axios.post('/login', params);
}

export function logout() {
  return axios.post('/logout')
}

export function register(params) {
  return axios.post('/register/save', params);
}

//图片验证码
export  function captchaImage(params) {
  return axios.get('/captchaImage', { params })
}
//发送短信
export  function smsSend(params) {
  return axios.post('/sms/send', params)
}
//找回密码
export function setPwd(params) {
  return axios.post('/setPwd', params)
}
//获取openId
export function getOpenId(data) {
  return axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token`, {
    params: {
      ...data,
      grant_type:'authorization_code'
    }
  });
}
// 医生二维码
export function getQrcode() {
  return axios.get('/hospital/doctor/qrCode');
}
//
// /hospital/doctor/qrCode/{id}
// 医生二维码,用户id
export function getQrcode2(params) {
  console.log(params)
  return axios.get('/hospital/doctor/qrCode/' + params.id);
}