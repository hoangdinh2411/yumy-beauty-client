import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, Input } from "components";
import useModal from "hooks/modalHook";
import AddStaffForm from "./forms/addStaffForm";
import { useSelector, useDispatch } from "react-redux";
import useStaffsContext from "hooks/staffsHook";
import filterActions from "store/filter/actions";

const selectStyle = { width: "160px", margin: "12px" };
function AddStaff({staffs, auth }) {
  const dispatch = useDispatch();
  const {staffId, setStaffId } = useStaffsContext()
  const categories = useSelector((state) => state.categories);
  const { handleShowModal, handleCloseModal } = useModal();


  const [searchValue, setSearchValue] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("All");
  
  
  
  const handleSearchText = useCallback((e) => {
    setSearchValue(e.target.value);
    dispatch(filterActions.search(e.target.value));
  }, []);

  const handleFilterByCategory = useCallback((e) => {
    setFilterByCategory(e.target.value);
    dispatch(filterActions.category(e.target.value));
  }, []);
  useEffect(() => {
    if (staffId) {
      handleShowModal(
        <AddStaffForm
          categories={categories}
          auth={auth}
          staffs={staffs}
          staffId={staffId}
          setStaffId={setStaffId}
        />
      );
    } else {
      handleCloseModal();
    }
    return () => {};
  }, [staffId]);
  return (
    <div className="searchBar">
      <Input
        value={searchValue}
        handleChange={handleSearchText}
        name="search"
        type="search"
        id="searchStaff"
        placeholder="Search Staff by Name"
      />
      <Select
        value={filterByCategory}
        handleChange={handleFilterByCategory}
        options={categories}
        defaultValue="Category"
        sx={selectStyle}
      />
      <Button
        handleClick={() =>
          handleShowModal(
            <AddStaffForm categories={categories}  auth={auth} />
          )
        }
      >
        Add Staff
      </Button>
    </div>
  );
}

export default React.memo(AddStaff);
