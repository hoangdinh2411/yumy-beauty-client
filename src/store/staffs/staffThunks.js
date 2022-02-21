import staffsAPI from "api/axios/staffsAPI";
import servicesActions from "store/services/actions";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
import staffActions from "./actions";

const staffThunks = {
  createNew: (formData) => {
    return (dispatch) => {
      return staffsAPI
        .create(formData)
        .then((data) => {
          dispatch(staffActions.createStaff(data));
          showSuccessMessageAlert("Create staff success", dispatch);
        })
        .catch((err) => {
          console.log(err)
          showErrorMessageAlert(err,dispatch);
        });
    };
  },

  getAll: () => {
    return (dispatch) => {
      return staffsAPI
        .getAll()
        .then((data) => {
          if (data.length > 0) {
            dispatch(staffActions.fetching(data));
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
      return staffsAPI
        .update(id, newData)
        .then((message) => {
          dispatch(staffActions.updateStaff(id, newData));
          showSuccessMessageAlert(message,dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  delete: (id) => {
    return (dispatch) => {
      return staffsAPI
        .delete(id)
        .then((message) => {
          dispatch(staffActions.deleteStaff(id));
          dispatch(servicesActions.updateByStaff(id))
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    };
  },
};

export default staffThunks;
