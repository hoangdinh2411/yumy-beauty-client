import React, { useEffect, useState, useCallback } from "react";
import { Button, Input } from "components";

import useModal from "hooks/modalHook";
import AddCouponsForm from "./forms/addCouponsForm";
import { useDispatch, useSelector } from "react-redux";
import filterActions from "store/filter/actions";
import useCouponsContext from "hooks/couponsHook";

const searchStyle = { marginRight: "12px", marginTop:'12px' };
function AddCoupons({ auth }) {
  const { currentCouponId, setCurrentCouponId } = useCouponsContext();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const { handleShowModal, modalStatus } = useModal();
  const coupons = useSelector((state) => state.coupons);
  const currentCoupon = currentCouponId
    ? coupons.find((item) => item._id === currentCouponId)
    : null;

  const handleSearchText = useCallback((e) => {
    setSearchValue(e.target.value);
    dispatch(filterActions.search(e.target.value));
  }, []);


  useEffect(() => {
    if (!currentCouponId) return;

    if (!modalStatus.showModal) {
      setCurrentCouponId(null);
    }

    handleShowModal(
      <AddCouponsForm
        currentCouponId={currentCouponId}
        currentCoupon={currentCoupon}
        auth={auth}
      />
    );
   
    return () => {};
  }, [currentCouponId, modalStatus]);

  return (
    <div className="searchBar">
      <Input
        sx={searchStyle}
        value={searchValue}
        handleChange={handleSearchText}
        name="search"
        type="search"
        id="searchCoupon"
        placeholder="Search coupon by name or code... "
      />
      <Button
        sx={{ marginRight: "12px" }}
        handleClick={() => handleShowModal(<AddCouponsForm  auth={auth} />)}
      >
        Add Coupon
      </Button>
    </div>
  );
}

export default React.memo(AddCoupons);
