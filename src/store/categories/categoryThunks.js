import categoryActions from "./actions";
import servicesActions from "../services/actions";
import categoryAPI from "api/axios/categoryAPI";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";

//Category
const categoryThunks = {
  createNew: (categoryData) => {
    return (dispatch) => {
      return categoryAPI
        .create(categoryData)
        .then((data) => {
          dispatch(categoryActions.createCategory(data));
          showSuccessMessageAlert("Create category success", dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    };
  },

  getAll: () => {
    return (dispatch) => {
      return categoryAPI
        .get()
        .then((data) => {
          if (data.length > 0) {
            dispatch(categoryActions.fetching(data));
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
      return categoryAPI
        .update(id, newData)
        .then((message) => {
          dispatch(categoryActions.updateCategory(id, newData));
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    };
  },
  delete : (id)=>{
    return (dispatch) => {
      return categoryAPI.delete(id)
        .then((message)=>{
          dispatch(categoryActions.deleteCategory(id));
          dispatch(servicesActions.deleteByCategory(id))
          showSuccessMessageAlert(message, dispatch);
        })
        .catch((err) => {
          showErrorMessageAlert(err,dispatch);
        });
    }
  }
};

export default categoryThunks;
