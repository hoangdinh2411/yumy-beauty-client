import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddCoupons from "./addCoupon";
import CouponsTable from "./table";
import { useLocation } from "react-router-dom";
import CouponsProvider from "context/couponContext";
import couponThunks from "store/coupons/couponThunks";

function Coupons() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentCouponId, setCurrentCouponId] = useState(null);
  const auth = JSON.parse(localStorage.getItem("authInfo"));

  useEffect(() => {
    dispatch(couponThunks.getAll());
  }, []);
  return (
    <CouponsProvider value={{ currentCouponId, setCurrentCouponId }}>
      <div className="wrapper__heading">
        <h3 className="pageTitle">{location.state}</h3>
        <AddCoupons auth={auth} />
      </div>
      <div className="content table ">
        <CouponsTable />
      </div>
    </CouponsProvider>
  );
}

export default Coupons;
