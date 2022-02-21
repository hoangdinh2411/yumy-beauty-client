import { useContext } from "react";
import { Coupons } from "context/couponContext";

const useCouponsContext = () => {
  const { currentCouponId, setCurrentCouponId } = useContext(Coupons);
  
  return { currentCouponId, setCurrentCouponId };
};

export default useCouponsContext;
