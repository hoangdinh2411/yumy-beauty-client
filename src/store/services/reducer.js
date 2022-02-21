import { actionTypes } from "./actions";
const initialState = [];

const servicesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_NEW_SERVICE:
      return [...state, payload];
    case actionTypes.FETCHING_SERVICES:
      return payload;
    case actionTypes.DELETE_SERVICE:
      return state.filter((service) => service._id !== payload);
    case actionTypes.DELETE_SERVICE_BY_CATEGORY:
      return state.filter((service) => service.category !== payload);
    case actionTypes.UPDATE_SERVICE:
      const {
        name,
        price,
        staffs,
        timeTake,
        selectedFile,
        category,
        updatedBy,
        description,
      } = payload.newData;
      return state.map((service) => {
        return service._id === payload.id
          ? {
              ...service,
              name,
              price,
              staffs,
              timeTake,
              selectedFile,
              category,
              updatedBy,
              description,
            }
          : service;
      });

      case actionTypes.UPDATE_SERVICE_BY_STAFF :
        return state.forEach((service) => {
          return service.staffs.filter( staff=>staff !== payload)
        });
    default:
      return state;
  }
};

export default servicesReducer;
