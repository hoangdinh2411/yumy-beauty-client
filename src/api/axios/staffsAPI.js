import axiosClient from './axiosConfig';

const url = "/staffs"
 const staffsAPI = {
    create: async(formData)=>{
        console.log(formData)
        return axiosClient.post(url,formData)
    },
    getAll: async()=>{
        return axiosClient.get(url)
    },
    delete: async(id)=>{
        return axiosClient.delete(`${url}/${id}`)
    },
    update: async(id, newData)=>{
        return axiosClient.patch(`${url}/${id}`,newData)
    },

}

export default staffsAPI