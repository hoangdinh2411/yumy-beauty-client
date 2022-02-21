import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddStaff from "./addStaff";
import StaffTable from "./table";
import { staffsRemainingSelector } from "store/selector.js";
import StaffsProvider from "context/staffsContext";
import useModal from "hooks/modalHook.js";
import { useLocation } from "react-router-dom";

function Staffs() {
  const location = useLocation();

  const [staffId, setStaffId] = useState(null);
  const { modalStatus } = useModal();
  const auth = JSON.parse(localStorage.getItem("authInfo"));
  const staffs = useSelector(staffsRemainingSelector);

  const currentStaff = staffId
    ? staffs.find((staff) => staff._id === staffId)
    : null;
  useEffect(() => {
    if (staffId) {
      if (!modalStatus.showModal) {
        setStaffId(null);
      }
    }
    return () => {};
  }, [modalStatus]);

  return (
    <StaffsProvider value={{ staffId, setStaffId }}>
      <div className="wrapper__heading">
        <h3 className="pageTitle">{location.state}</h3>
        <AddStaff staffs={staffs} auth={auth} currentStaff={currentStaff} />
      </div>
      <div className="content table">
        <StaffTable staffs={staffs} />
      </div>
    </StaffsProvider>
  );
}

export default React.memo(Staffs);
