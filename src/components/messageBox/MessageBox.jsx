import React from "react";
import styles from "./messageBox.module.css";
function MessageBox({ show, messageFromServer }) {
  let type;
  let message;
  if (messageFromServer) {
    // lay ra key
    type = Object.keys(messageFromServer)[0];
    // lay ra message 
    message = messageFromServer[type];
  }
  if (!show ) {
    return <></>;
  }

  const bgColorStyle = () => {
    switch (type) {
      case "error":
        return {
          backgroundColor: "red",
        };
      case "success":
        return {
          backgroundColor: "green",
        };

      default:
        return {
          backgroundColor: "blue",
        };
    }
  };

  return (
    <>
      <div className={styles.box} style={show ? {display:'block'} : {display:'none'}}>
        <p className={styles.text}> {message}</p>
        <p
          className={`${styles.line} ${show ? styles.count : ""}`}
          style={bgColorStyle()}
        ></p>
      </div>
    </>
  );
}

export default React.memo(MessageBox);
