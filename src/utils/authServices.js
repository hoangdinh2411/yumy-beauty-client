import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
import authAPI from "api/axios/authAPI";
import emailjs, { init } from "@emailjs/browser";

const service_id = "service_bw2qd27";
const template_id = "template_6nd6zf3";

const signInSuccess = (data, dispatch, navigate) => {
  localStorage.setItem("authInfo", JSON.stringify(data));
  navigate("/");
  showSuccessMessageAlert("Welcome", dispatch);
};

export const signUp = (formData, dispatch, navigate) => {
  authAPI
    .adminSignUp(formData)
    .then((data) => {
      signInSuccess(data, dispatch, navigate);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};

export const signInByUserName = (formData, dispatch, navigate) => {
  authAPI
    .adminSignIn(formData)
    .then((data) => {
      signInSuccess(data, dispatch, navigate);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};

export const signOut = (dispatch, navigate) => {
  localStorage.removeItem("authInfo");
  showSuccessMessageAlert("See you again", dispatch);
  navigate("/signin");
};

export const updateProfile = (userId, newData, dispatch) => {
  authAPI
    .updateProfile(userId, newData)
    .then((data) => {
      const auth = {
        result: data,
        token: JSON.parse(localStorage.getItem("authInfo")).token,
      };
      localStorage.setItem("authInfo", JSON.stringify(auth));
      showSuccessMessageAlert("Updated successfully", dispatch);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};

export const sendEmailToCustom = async (to_email, dispatch) => {
  init("user_nOD33CMzWDlYJZwGJ1Eyf");
  const from_name = "Yumy Beauty Salong";
  const from_email = "hoangdinh2411@gmail.com";
  const link_to_reset_password =
    "https://yumy-salon-admin-dashboard.herokuapp.com/resetpassword?email=" + to_email;

  const template_params = {
    from_name,
    from_email,
    to_email,
    link_to_reset_password,
  };
  emailjs
    .send(service_id, template_id, template_params)
    .then(() => {
      showSuccessMessageAlert("Check your email to reset password", dispatch);
    })
    .catch((error) => {
      console.log(error);
      showErrorMessageAlert("Try again later", dispatch);
    });
};

export const resetPassword = (formData) => {
  return authAPI.resetPassword(formData);
};
