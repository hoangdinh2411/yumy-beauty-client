import { useState, useEffect } from "react";
import styles from "./signinPage.module.css";
import { Button, Input } from "components";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  getFormData,
  getFieldError,
  showSuccessMessageAlert,
  showErrorMessageAlert,
} from "utils/services";
import { useDispatch } from "react-redux";
import { resetPassword } from "utils/authServices";

const styleForInput = { marginBottom: "12px" };
function ResetPassword() {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [passwordIsReset, setPasswordIsReset] = useState({
    status: false,
    result: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    const { oldPassword, newPassword, confirmPassword } = formData;
    const formIsValid =
      Object.values(formData).every((value) => !getFieldError(value)) &&
      newPassword === confirmPassword;
    setWasSubmitted(true);

    if (formIsValid) {
      const queryString = location.search;
      const params = "?email=";
      const email = queryString.slice(params.length, queryString.length);
      const data = {
        email,
        oldPassword,
        newPassword,
      };
      resetPassword(data)
        .then((data) => {
          showSuccessMessageAlert("Reset successfully", dispatch);
          setPasswordIsReset({
            status: true,
            result: data,
          });
        })
        .catch((err) => {
          showErrorMessageAlert(err, dispatch);
        });
    }
  };

  const handleCancel = () => {
    navigate("/signin");
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  if (passwordIsReset.status)
    return <Navigate to="/signin" state={passwordIsReset.result} />;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.heading}>Reset Password</h1>
        <Input
          showErrorMessage
          sx={styleForInput}
          wasSubmitted={wasSubmitted}
          id="password"
          handleShowPass={handleShowPass}
          icon={showPass ? <FaEye /> : <FaEyeSlash />}
          name="oldPassword"
          type={showPass ? "text" : "password"}
          title="Old Password"
        />
        <Input
          showErrorMessage
          sx={styleForInput}
          wasSubmitted={wasSubmitted}
          id="new-password"
          handleShowPass={handleShowPass}
          icon={showPass ? <FaEye /> : <FaEyeSlash />}
          name="newPassword"
          type={showPass ? "text" : "password"}
          title="New Password"
        />
        <Input
          showErrorMessage
          sx={styleForInput}
          wasSubmitted={wasSubmitted}
          id="confirm-password"
          handleShowPass={handleShowPass}
          name="confirmPassword"
          type="password"
          title="Confirm Password"
        />
        <div className={styles.button}>
          <Button handleClick={handleCancel} type="button">
            Signin
          </Button>
          <Button type="submit">Reset</Button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
