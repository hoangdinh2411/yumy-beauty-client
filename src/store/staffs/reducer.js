import { actionTypes } from "./actions";
const initialState = [];

const staffsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCHING_STAFFS:
      return payload;
    case actionTypes.CREATE_STAFF:
      return [...state, payload];
    case actionTypes.UPDATE_STAFF:
      const {fullName, selectedFile, phone, categories, age, email} = payload.newData
      return state.map((item) =>
        item._id === payload.id ? {...item, fullName, selectedFile, phone, categories, age, email}: item
      );
    case actionTypes.DELETE_STAFF:
      return state.filter((item) => item._id !== payload);
    default:
      return state;
  }
};

export default staffsReducer;
