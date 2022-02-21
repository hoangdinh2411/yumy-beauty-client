import { actionTypes } from "./actions";
const initialState = [];

const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCHING_CATEGORIES:
      return payload;
    case actionTypes.CREATE_CATEGORY:
      return [...state, payload];
    case actionTypes.UPDATE_CATEGORY:
      const {name, updatedBy} = payload.newData
      return state.map((item) =>
        item._id === payload.id ? {...item, name, updatedBy} : item
      );
    case actionTypes.DELETE_CATEGORY:
      return state.filter((item) => item._id !== payload);
    default:
      return state;
  }
};

export default categoriesReducer;
