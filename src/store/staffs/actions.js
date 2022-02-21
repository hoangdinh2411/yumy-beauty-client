export const actionTypes = {
  FETCHING_STAFFS: "fetching staffs",
  CREATE_STAFF: "create new staff",
  UPDATE_STAFF: "update staff",
  DELETE_STAFF: "delete staff",
};
const staffActions = {
  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_STAFFS,
      payload: data,
    };
  },

  createStaff: (formData) => {
    return {
      type: actionTypes.CREATE_STAFF,
      payload: formData,
    };
  },
  updateStaff: (id, newData) => {
    return {
      type: actionTypes.UPDATE_STAFF,
      payload: { id, newData },
    };
  },
  deleteStaff: (id) => {
    return {
      type: actionTypes.DELETE_STAFF,
      payload: id,
    };
  },
};

export default staffActions;
