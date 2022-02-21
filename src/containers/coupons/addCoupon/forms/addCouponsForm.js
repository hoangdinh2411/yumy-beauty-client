import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataPicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Input, Button } from "components";
import styles from "./form.module.css";
import { FaPlusCircle } from "react-icons/fa";
import useModal from "hooks/modalHook";
import {
  createCodeForCoupon,
  getFieldError,
  getFormData,
  showErrorMessageAlert,
} from "utils/services";
import couponThunks from "store/coupons/couponThunks";

const styleForInput = { marginBottom: "20px", width: "100%" };
const today = new Date();

function AddCouponsForm({ auth, currentCouponId, currentCoupon }) {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupons);

  const { handleCloseModal } = useModal();
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [campaignStartTime, setCampaignStartTime] = useState(
    currentCouponId ? new Date(currentCoupon.startDate) : today
  );
  const [campaignEndTime, setCampaignEndTime] = useState(
    currentCouponId ? new Date(currentCoupon.endDate) : today
  );
  const [dateError, setDateError] = useState("");
  //to show date
  // console.log(campaignStartTime.toDateString())
  useEffect(() => {
    let dateIsValid = true;
    // start date nho hon ngay hien tai = false
    // Neu month = nhau, thi check ngay co = nhau ko?
    if (campaignStartTime.getTime() < today.getTime()) {
      setDateError("Don't select old dates");
      dateIsValid = false;
    } else {
      if (campaignEndTime.getTime() <= campaignStartTime.getTime()) {
        setDateError("The end date not be older or the same start day");
        dateIsValid = false;
      }
    }
    if (dateIsValid) {
      setDateError("");
    }
  }, [campaignStartTime, campaignEndTime]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = getFormData(e);
    const code = createCodeForCoupon(
      formData.name,
      campaignStartTime,
      formData.percentage
    );
    // const existingCoupon = coupons?.every(
    //   (coupon) => coupon.name !== formData.name && coupon.code !== code
    // );

    let formIsValid = !currentCouponId
      ? Object.values(formData).every((value) => !getFieldError(value))
      : true;
    setWasSubmitted(true);
    if (formIsValid) {
      const couponData = {
        ...formData,
        code,
        startDate: campaignStartTime.toDateString(),
        endDate: campaignEndTime.toDateString(),
      };
      if (currentCouponId) {
        dispatch(
          couponThunks.update(currentCouponId, {
            ...couponData,
            updatedBy: auth?.result.fullName,
          })
        );
      } else {
        dispatch(
          couponThunks.createNew({
            ...couponData,
            createdBy: auth?.result.fullName,
          })
        );
      }
      e.currentTarget.reset();
      setWasSubmitted(false);
    } else {
      showErrorMessageAlert(
        currentCouponId
          ? "Change something that you want"
          : "Please fill out all fields",
        dispatch
      );
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.createCoupon}>
      <h1 className={styles.heading}>Add new coupon </h1>
      <Input
        value={currentCouponId ? currentCoupon?.name : undefined}
        wasSubmitted={wasSubmitted}
        title="Name"
        type="text"
        showErrorMessage
        name="name"
        sx={styleForInput}
      />

      <Input
        value={currentCouponId ? currentCoupon?.percentage : undefined}
        wasSubmitted={wasSubmitted}
        showErrorMessage
        title="Percentage"
        type="number"
        name="percentage"
        sx={styleForInput}
        placeholder="%"
      />
      <div>
        <p className={styles.dateTitle}>
          Start data <span className={styles.error}>{`* ${dateError}`}</span>{" "}
        </p>
        <DataPicker
          className={styles.dataPicker}
          selected={campaignStartTime}
          onChange={(date) => setCampaignStartTime(date)}
        />
      </div>
      <div>
        <p className={styles.dateTitle}>
          End data <span className={styles.error}>{`* ${dateError}`}</span>
        </p>
        <DataPicker
          className={styles.dataPicker}
          selected={campaignEndTime}
          onChange={(date) => setCampaignEndTime(date)}
        />
      </div>
      <div className={styles.buttons}>
        <Button handleClick={handleCloseModal} type="button">
          Cancel
        </Button>
        <Button type="submit">
          <FaPlusCircle />
          {currentCouponId ? "Update" : "Add new"}
        </Button>
      </div>
    </form>
  );
}

export default React.memo(AddCouponsForm);
