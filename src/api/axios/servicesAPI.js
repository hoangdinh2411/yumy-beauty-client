import axiosClient from './axiosConfig';

const url = "/services"
 const servicesAPI = {
    addNewService: async(serviceData)=>{
        return axiosClient.post(url,serviceData)
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

export default servicesAPI