import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL ||'http://localhost:5000' ,
  timeout:10000,
  headers: {
    "content-type": "application/json",
  },
});




axiosClient.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(res=>{
    if(res && res.data ){
        return res.data
    }
    return res
},
err =>{
    return Promise.reject(err)
})


export default axiosClient