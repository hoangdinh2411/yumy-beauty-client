import styles from './loading.module.css';
import React from 'react'
function Loading() {
  return (
    <div className={styles.loadingImg}>
      <h1>Loading...!</h1>
    </div>
   
  );
}

export default React.memo(Loading);
