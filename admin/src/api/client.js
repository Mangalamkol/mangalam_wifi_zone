import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:5000'

const client = axios.create({ baseURL: `${baseURL}/api` })

client.interceptors.request.use(cfg => {
  const token = localStorage.getItem('mangalam_admin_token')
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default client