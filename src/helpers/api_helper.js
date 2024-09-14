import axios from "axios"
import authHeader from "./jwt-token-access/auth-token-header"


//pass new generated access token here
const _token = authHeader()
const token = `Bearer ${_token?.authorization}`

//apply base url for axios
const API_URL = "http://localhost:3000/api/"

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.defaults.headers.common["Authorization"] = token
axiosApi.defaults.headers.common["Content-Type"] = "multipart/form-data"
axiosApi.defaults.headers.post['Content-Type'] = 'multipart/form-data';


axiosApi.interceptors.response.use(
  (response) => {
    axiosApi.defaults.headers.common["Authorization"] = token
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
    .catch(err => err)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
    .catch(err => err)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
    .catch(err => err)
}

export default axiosApi;
