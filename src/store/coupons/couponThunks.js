import couponActions from "./actions";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
import couponsAPI from "api/axios/couponsAPI";

//Category
const couponThunks = {
  createNew: (couponData) => {
    return (dispatch) => {
      return couponsAPI
        .create(couponData)
        .then((data) => {
          dispatch(couponActions.createCoupon(data));
          showSuccessMessageAlert("Create coupon success", dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    };
  },

  getAll: () => {
    return (dispatch) => {
      return couponsAPI
        .get()
        .then((data) => {
          if (data.length > 0) {
            dispatch(couponActions.fetching(data));
          }
          return;
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    };
  },

  update: (id, newData) => {
    return (dispatch) => {
      return couponsAPI
        .update(id, newData)
        .then((message) => {
          dispatch(couponActions.updateCoupon(id, newData));
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  delete : (id)=>{
    return (dispatch) => {
      return couponsAPI.delete(id)
        .then((message)=>{
          dispatch(couponActions.deleteCoupon(id));
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    }
  }
};

export default couponThunks;
