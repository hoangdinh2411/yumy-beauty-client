import React from "react";
import styles from "./notification.module.css";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
function Notification() {
  return (
    <div className={styles.wrapper} title="Notification">
      <Link to="/notification" >
        <FaBell />
      </Link>
      <span className={styles.number}>3</span>
    </div>
  );
}

export default React.memo(Notification);
