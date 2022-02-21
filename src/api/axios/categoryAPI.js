import axiosClient from "./axiosConfig";
const url = "/category";

const categoryAPI = {
  create: async (data) => {
    return  await axiosClient.post(url, data);
  },
  get: async () => {
    return await axiosClient.get(url);
  },
  update: async(id, newData)=>{
    return await axiosClient.patch(`${url}/${id}`, newData);

  },
  delete: async(id)=>{
    return await axiosClient.delete(`${url}/${id}`);

  }
};
export default categoryAPI;
