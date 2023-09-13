import axios from "axios";
import { apiBaseUrl } from "./APIUtils";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
const baseURL = apiBaseUrl

const axiosController = new AbortController()
const axiosTokenIntercept = axios.create({
    baseURL,
    signal: axiosController.signal
})

axiosTokenIntercept.interceptors.request.use(
    async (request) => {
    let authToken = JSON.parse(localStorage.getItem('token'))
    
    const user = jwtDecode(authToken.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired){
        request.headers.Authorization = `Bearer ${authToken.access}`
        return request
    } 
    const response = await axios.post(`${apiBaseUrl}/api/token/refresh/`, {
        refresh:authToken.refresh
    })
    localStorage.setItem("token", JSON.stringify(response.data))
    request.headers.Authorization = `Bearer ${response.data.access}`
    return request

}, (error) => {
    return Promise.reject(error)

})


export default axiosTokenIntercept