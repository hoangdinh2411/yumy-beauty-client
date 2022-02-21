export const actionTypes = {
  SEARCH_BY_TEXT: "search by text",
  FILTER_BY_CATEGORY: "filter by category",
  FILTER_BY_PRICE: "filter by price",
};

const filterActions = {
  search: (text) => {
    return {
      type: actionTypes.SEARCH_BY_TEXT,
      payload: text,
    };
  },
  category: (categoryName) => {
    return {
      type: actionTypes.FILTER_BY_CATEGORY,
      payload: categoryName,
    };
  },
  price: (condition) => {
    return {
      type: actionTypes.FILTER_BY_PRICE,
      payload: condition,
    };
  },
};

export default filterActions
