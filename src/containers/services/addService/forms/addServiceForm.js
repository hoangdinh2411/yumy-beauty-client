import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FileBase from "react-file-base64";

import { Input, Button, Select, TreeSelect } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import servicesThunks from "store/services/servicesThunks";
import {
  getFormData,
  showErrorMessageAlert,
  getFieldError,
} from "utils/services";

const styleForInput = { marginBottom: "20px", width: "100%" };
function AddServiceForm({
  categories,
  auth,
  currentService,
  currentServiceId,
  setCurrentServiceId,
}) {
  const dispatch = useDispatch();
  const { handleCloseModal } = useModal();
  const services = useSelector((state) => state.services);
  const staffs = useSelector((state) => state.staffs);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  //select Category
  const [selectedValue, setSelectedValue] = useState(
    currentServiceId ? currentService["category"] : ""
  );

  // Select staff for service
  const [selectedStaff, setSelectedStaff] = useState("");

  //select file anh and convert to base 64
  const [selectedFile, setSelectedFile] = useState(
    currentServiceId ? currentService["selectedFile"] : ""
  );

  //push all selected staffs into an array 
  const [selectedStaffs, setSelectedStaffs] = useState(
    currentServiceId ? currentService["staffs"] : []
  );

  //functions
  const handleSelectCategory = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleDeleteSelectedStaffs = (id) => {
    setSelectedStaffs(selectedStaffs.filter((category) => category !== id));
  };
  const handleSelectStaff = (e) => {
    setSelectedStaff(e.target.value);
    if (!selectedStaffs.includes(e.target.value) && e.target.value !=='All') {
      setSelectedStaffs([...selectedStaffs, e.target.value]);
    }
  };

  const handleSelectFile = ({ base64 }) => {
    setSelectedFile(base64);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Neu trung category, thi check co trung ten service ko? neu k thi cho add
    const formData = getFormData(e);
    const { name } = formData;
    let formIsValid = false;
    if (Object.values(formData).every((value) => !getFieldError(value))) {
      if (currentService) {
        formIsValid = true;
      } else {
        formIsValid = services?.every((service) => {
          if (service.category === selectedValue) {
            if (service.name === name) {
              return false;
            }
          }
          return true;
        });
      }
    }

    setWasSubmitted(true);
    if (formIsValid) {
      const serviceData = {
        ...formData,
        name,
        staffs: selectedStaffs,
        selectedFile,
        category: selectedValue,
      };
      if (currentServiceId) {
        dispatch(
          servicesThunks.updateService(currentServiceId, {
            ...serviceData,
            updatedBy: auth?.result?.fullName,
          })
        );
        setCurrentServiceId(null);
      } else {
        dispatch(
          servicesThunks.addNew({
            ...serviceData,
            createdBy: auth?.result?.fullName,
          })
        );
      }
      e.currentTarget.reset();
      setSelectedValue("");
      setSelectedFile("");
      setSelectedStaffs([])
      setWasSubmitted(false);
    } else {
      showErrorMessageAlert(
        currentServiceId
          ? "Change something if you want"
          : "Please fill out all fields",
        dispatch
      );
    }
  };

  return (
    <div className={styles.addForm}>
      <h1 className={styles.heading}>Add new service </h1>
      <div className={styles.addFile}>
        <div className={styles.inputs}>
          <form noValidate onSubmit={handleSubmit}>
            <Input
              value={currentServiceId ? currentService["name"] : undefined}
              wasSubmitted={wasSubmitted}
              title="Name"
              type="text"
              showErrorMessage
              name="name"
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["price"] : undefined}
              wasSubmitted={wasSubmitted}
              title="Price"
              type="text"
              showErrorMessage
              name="price"
              sx={styleForInput}
            />
            <Input
              value={currentServiceId ? currentService["timeTake"] : undefined}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Time up to"
              type="text"
              name="timeTake"
              sx={styleForInput}
            />
            <Select
              options={staffs}
              wasSubmitted={wasSubmitted}
              showErrorMessage
              defaultValue="Choose staff"
              title="Staffs"
              sx={styleForInput}
              handleChange={handleSelectStaff}
              value={selectedStaff}
            />
            <TreeSelect
              options={staffs}
              selected={selectedStaffs}
              handleDeleteOption={handleDeleteSelectedStaffs}
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
            <Input
              value={
                currentServiceId ? currentService["description"] : undefined
              }
              wasSubmitted={wasSubmitted}
              showErrorMessage
              title="Description"
              type="textarea"
              name="description"
              sx={styleForInput}
            />
            <div className={styles.buttons}>
              <Button handleClick={handleCloseModal} type="button">
                Cancel
              </Button>
              <Button type="submit">
                <FaPlusCircle />
                {currentServiceId ? "Update" : "Add new"}
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.filePreview}>
          <FileBase type="file" multiple={false} onDone={handleSelectFile} />
          {wasSubmitted && selectedFile === "" ? (
            <span className={styles.note}>
              * Select a image for the service *
            </span>
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

export default React.memo(AddServiceForm);
