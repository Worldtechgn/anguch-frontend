import axios from 'axios';


export default function Auth() {
    const http = axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return {
        http
    }
}