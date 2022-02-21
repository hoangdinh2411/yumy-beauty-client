export const actionTypes = {
  FETCHING_CATEGORIES: "fetching categories",
  CREATE_CATEGORY: "create new category",
  UPDATE_CATEGORY: "update category",
  DELETE_CATEGORY: "delete category",
};
const categoryActions = {
  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_CATEGORIES,
      payload: data,
    };
  },

  createCategory: (categoryData) => {
    return {
      type: actionTypes.CREATE_CATEGORY,
      payload: categoryData,
    };
  },
  updateCategory: (id, newData) => {
    return {
      type: actionTypes.UPDATE_CATEGORY,
      payload: { id, newData },
    };
  },
  deleteCategory: (id) => {
    return {
      type: actionTypes.DELETE_CATEGORY,
      payload: id,
    };
  },
};

export default categoryActions;
