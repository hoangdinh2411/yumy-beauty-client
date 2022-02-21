import React from "react";
import styles from "./modal.module.css";

function Modal({modalStatus,  children ,setModalStatus}) {

  const handleCloseModal =()=>{
    setModalStatus({
      body: null,
      showModal: false
    })
  }
  if(!modalStatus.showModal){
    return null
  }
  return (
    <div className={`${styles.main} `} style={modalStatus.showModal ? {display:'flex'} : {display:'none'} }>
      <div className={styles.overlay} title="Close Modal" onClick={handleCloseModal}></div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default Modal;
