import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import { Input, Button } from "components";
import categoryThunks from "store/categories/categoryThunks";
import {
  formatCategoryName,
  getFieldError,
  getFormData,
  showErrorMessageAlert,
} from "utils/services";

function AddCategoryForm({
  auth,
  categories,
  currentCategory,
  currentCategoriesId,
}) {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const { handleCloseModal } = useModal();
  const dispatch = useDispatch();

  //Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);
    const formIsValid =
      Object.values(formData).every((value) => !getFieldError(value)) &&
      (!currentCategoriesId
        ? categories?.every((value) => value.name !== formData.name)
        : true);

    setWasSubmitted(true);
    if (formIsValid) {
      const data = {
        name: formatCategoryName(formData.name.trim()),
      };
      if (currentCategoriesId) {
        dispatch(
          categoryThunks.update(currentCategoriesId, {
            ...data,
            updatedBy: auth?.result?.fullName,
          })
        );
      } else {
        dispatch(
          categoryThunks.createNew({
            ...data,
            createdBy: auth?.result?.fullName,
          })
        );
      }
      e.currentTarget.reset();
      setWasSubmitted(false);
    } else {
      showErrorMessageAlert(
        currentCategoriesId
          ? "Change something if you want"
          : "Please fill out all fields",
        dispatch
      );
    }
  };

  return (
    <form
      noValidate
      className={styles.createCategoryForm}
      onSubmit={handleSubmit}
    >
      <h1 className={styles.heading}>Create new category</h1>
      <Input
        value={currentCategoriesId ? currentCategory.name : undefined}
        wasSubmitted={wasSubmitted}
        sx={{ margin: "12px 0" }}
        type="text"
        name="name"
        title="Category name"
      />
      <div className={styles.buttons}>
        <Button handleClick={handleCloseModal} type="button">
          Cancel
        </Button>
        <Button type="submit">
          <FaPlusCircle />
          {currentCategoriesId ? "Update" : "Create a new"}
        </Button>
      </div>
    </form>
  );
}

export default AddCategoryForm;
