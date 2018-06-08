import axios from 'axios'
import {getRedirectPath} from '../util'

const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCESS = 'AUTH_SUCESS'

const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCESS:
      return {...state,...action.payload,msg:'', redirectTo: getRedirectPath(action.payload)}
    case ERROR_MSG:
      return {...state,msg: action.msg,isAuth: false}
    case LOAD_DATA:
      return {...state,...action.payload}
    default:
      return {...state}
  }
}

function errorMsg(msg) {
  return {type:ERROR_MSG,msg}
}

function authSuccess(data) {
  let {pwd, ...obj} = data
  return {type:AUTH_SUCESS, payload:obj}
}

export function loadData(data) {
  return {type:LOAD_DATA,payload:data}
}

export function login({pwd,user}) {
  if(!user||!pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user,pwd})
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({pwd,user,repeatpwd,type}) {
  if(!user||!pwd||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if(pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不相同')
  }
  return dispatch => {
    axios.post('/user/register',{pwd,user,repeatpwd,type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({user,pwd,type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}