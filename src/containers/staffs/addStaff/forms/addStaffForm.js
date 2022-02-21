import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";

import { Input, Button, Select, TreeSelect } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import staffThunks from "store/staffs/staffThunks";
import {
  getFormData,
  showErrorMessageAlert,
  getFieldError,
} from "utils/services";

const styleForInput = { marginBottom: "20px", width: "100%" };
function AddStaffForm({ categories, auth, staffId, setStaffId, staffs }) {
  const dispatch = useDispatch();
  const { handleCloseModal } = useModal();
  const currentStaff = staffs?.find((staff) => staff._id === staffId);

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(
    staffId ? currentStaff.selectedFile : ""
  );
  const [selectedCategories, setSelectedCategories] = useState(
    staffId ? currentStaff.categories : []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    let formIsValid = false;

    if (Object.values(formData).every((value) => !getFieldError(value))) {
      if (staffId) {
        formIsValid = true;
      } else {
        if (selectedFile !== "" && selectedCategories.length > 0) {
          formIsValid = true;
        }
      }
    }
    setWasSubmitted(true);

    if (formIsValid) {
      const staffData = {
        ...formData,
        categories: selectedCategories,
        selectedFile,
      };

      if (staffId) {
        dispatch(
          staffThunks.update(staffId, {
            ...staffData,
            updatedBy: auth?.result?.fullName,
          })
        );
        setStaffId(null);
      } else {
        dispatch(
          staffThunks.createNew({
            ...staffData,
            createdBy: auth?.result?.fullName,
          })
        );
      }
      e.currentTarget.reset();
      setSelectedValue("");
      setSelectedFile("");
      setSelectedCategories([]);
      setWasSubmitted(false);
    } else {
      showErrorMessageAlert(
        staffId ? "Change something if you want" : "Please fill out all fields",
        dispatch
      );
    }
  };

  const handleDeleteSelectedCategory=(id)=>{
    setSelectedCategories(selectedCategories.filter(category=>category !==id))
  } 
  const handleSelectCategory = (e) => {
    setSelectedValue(e.target.value);
    if (!selectedCategories.includes(e.target.value) && e.target.value !=='All') {
      setSelectedCategories([...selectedCategories, e.target.value]);
    }
  };

  const handleSelectFile = ({ base64 }) => {
    setSelectedFile(base64);
  };

  return (
    <div className={styles.addForm}>
      <h1 className={styles.heading}>Add new staff </h1>
      <div className={styles.addFile}>
        <div className={styles.inputs}>
          <form noValidate onSubmit={handleSubmit}>
            <Input
              value={staffId ? currentStaff["fullName"] : undefined}
              wasSubmitted={wasSubmitted}
              title="Full Name"
              type="text"
              showErrorMessage
              name="fullName"
              sx={styleForInput}
            />
            <Input
              value={staffId ? currentStaff["age"] : undefined}
              wasSubmitted={wasSubmitted}
              title="Age"
              type="number"
              showErrorMessage
              name="age"
              sx={styleForInput}
            />
            <Input
              value={staffId ? currentStaff["phone"] : undefined}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Phone number"
              type="tel"
              name="phone"
              sx={styleForInput}
            />
            <Input
              value={staffId ? currentStaff["email"] : undefined}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Email"
              type="text"
              name="email"
              sx={styleForInput}
            />
            <Select
              wasSubmitted={wasSubmitted}
              options={categories}
              defaultValue="Category"
              title="Category"
              showErrorMessage
              handleChange={handleSelectCategory}
              value={selectedValue}
              sx={styleForInput}
            />

            {/* multiple select */}
            <TreeSelect options={categories} selected={selectedCategories} handleDeleteOption={handleDeleteSelectedCategory}/>
            <div className={styles.buttons}>
              <Button handleClick={handleCloseModal} type="button">
                Cancel
              </Button>
              <Button type="submit">
                <FaPlusCircle />
                {staffId ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.filePreview}>
          <FileBase type="file" value={selectedFile} multiple={false} onDone={handleSelectFile} />
          {wasSubmitted && selectedFile === "" ? (
            <span className={styles.note}>* Select a image for avatar *</span>
          ) : (
            <img
              className={styles.view}
              src={selectedFile}
              alt={selectedFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AddStaffForm);
