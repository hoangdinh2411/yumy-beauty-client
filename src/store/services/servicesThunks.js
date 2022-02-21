import servicesActions from "./actions";
import servicesAPI from "api/axios/servicesAPI";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
// Service
const servicesThunks = {
  addNew: (serviceData) => {
    return (dispatch) => {
      return servicesAPI
        .addNewService(serviceData)
        .then((data) => {
          dispatch(servicesActions.addNew(data));
          showSuccessMessageAlert("Add service success", dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  getAll: () => {
    return (dispatch) => {
      return servicesAPI
        .getAll()
        .then((data) => {
          if (data.length > 0) {
            dispatch(servicesActions.fetching(data));
          }
          return;
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  deleteService: (id) => {
    return (dispatch) => {
      return servicesAPI
        .delete(id)
        .then((message) => {
          dispatch(servicesActions.delete(id));
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  updateService: (id, newData) => {
    return (dispatch) => {
      return servicesAPI
        .update(id, newData)
        .then((message) => {
          dispatch(servicesActions.update(id, newData));
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
};

export default servicesThunks;
