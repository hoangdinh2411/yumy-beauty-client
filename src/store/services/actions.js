export const actionTypes = {
  ADD_NEW_SERVICE: "add new service",
  FETCHING_SERVICES: "fetching all services",
  UPDATE_SERVICE: "update service",
  UPDATE_SERVICE_BY_STAFF: "update service by staff",
  DELETE_SERVICE: "delete service",
  DELETE_SERVICE_BY_CATEGORY : 'delete services by category'
};
const servicesActions = {
  addNew: (serviceData) => {
    return {
      type: actionTypes.ADD_NEW_SERVICE,
      payload: serviceData,
    };
  },

  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_SERVICES,
      payload: data,
    };
  },
  
  update: (id, newData) => {
    return {
      type: actionTypes.UPDATE_SERVICE,
      payload: { id, newData },
    };
  },
  updateByStaff: (staffId) => {
    return {
      type: actionTypes.UPDATE_SERVICE_BY_STAFF,
      payload: staffId,
    };
  },
  delete: (id) => {
    return {
      type: actionTypes.DELETE_SERVICE,
      payload: id,
    };
  },
  deleteByCategory: (categoryId) => {
    return {
      type: actionTypes.DELETE_SERVICE_BY_CATEGORY,
      payload: categoryId,
    };
  },
};

export default servicesActions;
