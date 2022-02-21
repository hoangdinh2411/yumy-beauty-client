import React from "react";
import styles from "./treeSelect.module.css";
function TreeSelect({ options, selected, handleDeleteOption }) {
  return (
    <ul className={styles.list}>
      {options.map((item) => {
        for (let i = 0; i < selected.length; i++) {
          if (item._id === selected[i]) {
            return (
              <li key={item._id} className={styles.selectedItem}>
                <div className={styles.box}>
                  <span className={styles.close} onClick={()=>handleDeleteOption(item._id)}>X</span>
                  {item.name || item.fullName}
                  </div>
              </li>
            );
          }
        }
      })}
    </ul>
  );
}

export default TreeSelect;
