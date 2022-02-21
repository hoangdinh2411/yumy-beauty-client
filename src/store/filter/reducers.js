import {actionTypes} from './actions'
const initialState = {
  search: "",
  category: "All",
  priceFrom: "All",
};
const filterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SEARCH_BY_TEXT:
            return {
                ...state,
                search: payload,
            }
        case actionTypes.FILTER_BY_CATEGORY:
            return {
                ...state,
                category: payload,
            }
        case actionTypes.FILTER_BY_PRICE:
            return {
                ...state,
                priceFrom: payload,
            }
    
        default:
            return state
    }


};

export default filterReducer
