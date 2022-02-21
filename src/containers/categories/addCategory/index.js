import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, Input } from "components";
import useModal from "hooks/modalHook";
import AddCategoryForm from "./forms/addCategoryForm";
import { useDispatch } from "react-redux";
import filterActions from "store/filter/actions";
import useCategoriesContext from "hooks/categoriesHook";

const selectStyle = { width: "160px", margin: "12px" };
function AddCategory({ auth, categories, currentCategory }) {
  const dispatch = useDispatch();
  const { currentCategoriesId, setCurrentCategoriesId } =
    useCategoriesContext();
  const [searchValue, setSearchValue] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("All");
  const { handleShowModal, handleCloseModal } = useModal();

  const handleSearchText = (e) => {
    setSearchValue(e.target.value);
    dispatch(filterActions.search(e.target.value));
  };

  const handleFilterByCategory = useCallback((e) => {
    setFilterByCategory(e.target.value);
    dispatch(filterActions.category(e.target.value));
  }, []);

  useEffect(() => {
    if (!currentCategoriesId) return;
    handleShowModal(
      <AddCategoryForm
        categories={categories}
        auth={auth}
        currentCategory={currentCategory}
        currentCategoriesId={currentCategoriesId}
        setCurrentCategoriesId={setCurrentCategoriesId}
      />
    );
    return () => {};
  }, [currentCategoriesId]);
  return (
    <div className="searchBar">
      <Input
        value={searchValue}
        handleChange={handleSearchText}
        name="search"
        type="search"
        id="searchCategory"
        placeholder="Search"
      />
      <Select
        value={filterByCategory}
        handleChange={handleFilterByCategory}
        options={categories}
        defaultValue="Category"
        sx={selectStyle}
      />
      <Button
        sx={{ marginRight: "12px" }}
        handleClick={() =>
          handleShowModal(
            <AddCategoryForm categories={categories} auth={auth} />
          )
        }
      >
        Add Category
      </Button>
    </div>
  );
}

export default React.memo(AddCategory);
