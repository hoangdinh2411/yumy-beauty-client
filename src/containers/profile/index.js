import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FileBase from "react-file-base64";
import { Button, Input } from "components";
import styles from "./profile.module.css";
import useAuth from "hooks/useAuth";
import { updateProfile } from "utils/authServices";
import { useDispatch } from "react-redux";

const profileInputStyle = {
  width: 600,
  marginBottom: 50,
};
function Profile() {
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useAuth();
  const user = auth?.result;
  const [formChanged, setFormChanged] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [fields, setFields] = useState({
    fullName: user?.fullName,
    phone: user?.phone,
    email: user?.email,
  });
  const keys = Object.keys(fields);

  // If user reset page with unsaved changes, it shows up a message
  const handleChange = (e) => {
    const field = e.target.name;
    // if the value that user entered isn't the same user info on data, that mean the form was changed
    setFields({
      ...fields,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    let result;
    result = keys.some((key) => {
      return fields[key] !== user[key];
    });
    setFormChanged(result);

    if (selectedFile) {
      setFormChanged(true);
    }
  }, [fields, selectedFile]);

  const handleSelectAvatar = ({ base64 }) => {
    setSelectedFile(base64);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    if (!formChanged) return;
    let newData;

    if (user?.avatar && !selectedFile) {
      //If there is user avatar and user doesn't select any file, get user existed avatar
      newData = {
        ...auth?.result,
        ...fields,
      };
    } else {

      //If there isn't user avatar , get picture from selected file, it can be a empty string or a string
        newData = {
          ...auth?.result,
          ...fields,
          avatar: selectedFile,
        };
    }
    updateProfile(auth?.result?._id, newData, dispatch);
  };

  return (
    <>
      <div className="wrapper__heading">
        <h3 className="pageTitle">{location.state}</h3>
      </div>
      <form noValidate className="content profile ">
        <div className={styles.avatarContainer}>
          {user?.avatar ? (
            <img src={user?.avatar} className={styles.avatar} alt="" />
          ) : selectedFile ? (
            <img src={selectedFile} className={styles.avatar} alt="" />
          ) : (
            <p className={styles.avatar}>
              {user?.fullName.charAt(0).toUpperCase()}
            </p>
          )}

          <FileBase type="file" multiple={false} onDone={handleSelectAvatar} />
        </div>
        <Input
          type="text"
          name="fullName"
          handleChange={handleChange}
          value={fields.fullName}
          sx={profileInputStyle}
          title="Full Name"
        />
        <Input
          type="text"
          name="username"
          handleChange={handleChange}
          value={user?.username}
          sx={profileInputStyle}
          title="Username"
          disabled
        />
        <Input
          type="phone"
          name="phone"
          handleChange={handleChange}
          value={fields.phone}
          sx={profileInputStyle}
          title="Phone"
        />
        <Input
          type="email"
          name="email"
          handleChange={handleChange}
          value={fields.email}
          sx={profileInputStyle}
          title="Email"
        />
      </form>
      <div className={styles.buttons}>
        <span></span>
        <Button
          handleClick={handleEditProfile}
          disable={formChanged ? false : true}
        >
          Edit
        </Button>
      </div>
    </>
  );
}

export default Profile;
