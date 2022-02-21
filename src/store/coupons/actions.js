export const actionTypes = {
  FETCHING_COUPONS: "fetching coupons",
  ADD_COUPON: "add new coupons",
  UPDATE_COUPON: "update coupon",
  DELETE_COUPON: "delete coupon",
};
const couponActions = {
  fetching: (data) => {
    return {
      type: actionTypes.FETCHING_COUPONS,
      payload: data,
    };
  },

  createCoupon: (couponData) => {
    return {
      type: actionTypes.ADD_COUPON,
      payload: couponData,
    };
  },
  updateCoupon: (id, newData) => {
    return {
      type: actionTypes.UPDATE_COUPON,
      payload: { id, newData },
    };
  },
  deleteCoupon: (id) => {
    return {
      type: actionTypes.DELETE_COUPON,
      payload: id,
    };
  },
};

export default couponActions;
