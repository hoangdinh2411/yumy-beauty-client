import {UserAvatar,Notification} from "components";
import React from "react";
import styles from "./appbar.module.css";
function Appbar() {
  

  return (
    <div className={`${styles.wrapper}`}>
      <Notification/>
      <UserAvatar />
    </div>
  );
}

export default React.memo(Appbar);
