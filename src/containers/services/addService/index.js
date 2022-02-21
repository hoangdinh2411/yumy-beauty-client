import React, { useEffect, useState, useCallback } from "react";
import { Button, Select, Input } from "components";

import useModal from "hooks/modalHook";
import AddServiceForm from "./forms/addServiceForm";
import { useSelector, useDispatch } from "react-redux";
import filterActions from "store/filter/actions";
import useServicesContext from "hooks/servicesHook";
const selectByPrices = [
  {
    id: 1,
    name: "Hight to Low",
    value: "Hight to Low",
  },
  {
    id: 2,
    name: "Low to High",
    value: "Low to High",
  },
];

const selectStyle = { width: "160px", margin: "12px" };
function AddService({ auth, currentService }) {
  const { currentServiceId, setCurrentServiceId } = useServicesContext();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("All");
  const [filterByPrice, setFilterByPrice] = useState("All");
  const { handleShowModal, handleCloseModal } = useModal();
  const categories = useSelector((state) => state.categories);

  const handleSearchText = useCallback((e) => {
    setSearchValue(e.target.value);
    dispatch(filterActions.search(e.target.value));
  }, []);

  const handleFilterByCategory = useCallback((e) => {
    setFilterByCategory(e.target.value);
    dispatch(filterActions.category(e.target.value));
  }, []);
  const handleFilterByPrice = useCallback((e) => {
    setFilterByPrice(e.target.value);
    dispatch(filterActions.price(e.target.value));
  }, []);

  useEffect(() => {
    if (currentServiceId) {
      handleShowModal(
        <AddServiceForm
          categories={categories}
          auth={auth}
          currentService={currentService}
          currentServiceId={currentServiceId}
          setCurrentServiceId={setCurrentServiceId}
        />
      );
    } else {
      handleCloseModal();
    }
    return () => {};
  }, [currentService]);

  
  return (
    <div className="searchBar">
      <Input
        value={searchValue}
        handleChange={handleSearchText}
        name="search"
        type="search"
        id="searchService"
        placeholder="Search"
      />
      <Select
        value={filterByCategory}
        handleChange={handleFilterByCategory}
        options={categories}
        defaultValue="Category"
        sx={selectStyle}
      />
      <Select
        value={filterByPrice}
        handleChange={handleFilterByPrice}
        options={selectByPrices}
        defaultValue="Price"
        sx={selectStyle}
      />
      <Button
        handleClick={() =>
          handleShowModal(
            <AddServiceForm categories={categories} auth={auth} />
          )
        }
      >
        Add New Service
      </Button>
    </div>
  );
}

export default React.memo(AddService);
