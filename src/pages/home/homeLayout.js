import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./homepage.module.css";
import Appbar from "containers/appbar";
import { Modal, Navbar } from "components";
import { ModalContext } from "context/modalContext";
import { useDispatch } from "react-redux";
import categoryThunks from "store/categories/categoryThunks";
import servicesThunks from "store/services/servicesThunks";
import staffThunks from "store/staffs/staffThunks";
function HomeLayout() {
  const dispatch = useDispatch();

  const [modalStatus, setModalStatus] = useState({
    body: null,
    showModal: false,
  });

  useEffect(() => {
    dispatch(categoryThunks.getAll());
    dispatch(servicesThunks.getAll());
    dispatch(staffThunks.getAll());
  }, []);

  return (
    <ModalContext.Provider value={{ modalStatus, setModalStatus }}>
      <div className="row height100 dashboard">
        <div className="col l-2 ">
          <Navbar />
        </div>
        <div className={`col l-10`}>
          <div className={`glass-primary`}>
            <Appbar />
          </div>
          <div className={`  ${styles.outlet}`}>
            <div className={`${styles.wrapper} glass-primary`}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Modal modalStatus={modalStatus} setModalStatus={setModalStatus}>
        {modalStatus.body}
      </Modal>
    </ModalContext.Provider>
  );
}

export default HomeLayout;
