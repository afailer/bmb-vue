import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if(token){
    config.headers.token = token
  }
  return config
})
axios.interceptors.response.use((response) => {
  if(response.data.code !==0 ){
    localStorage.removeItem('token')
    window.location.href = 'login'
    return Promise.reject("")
  }else{
    return response
  }
})


export const get = axios.get
export const post = axios.post
export const del = axios.delete
export const patch = axios.patch