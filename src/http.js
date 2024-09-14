import axios from 'axios';
const token = localStorage.getItem("authUser")
export default axios.create({
    baseURL: "http://37.60.229.94:3000",
    headers: {
        "Content-type": "application/json",
        "Accept": 'application/json',
        "Authorization": "Bearer " + token
    }
})
