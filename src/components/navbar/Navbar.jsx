import React from "react";
import { Link , NavLink,useNavigate} from "react-router-dom";
import { menuItems } from "constants";
import styles from "./navbar.module.css";
import Button from "components/button/Button";
import { useDispatch } from 'react-redux';
import { signOut } from "utils/authServices";

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleSignOut =()=>{
    signOut(dispatch,navigate)
  }
  return (
    <div className={`${styles.navbar} glass-primary`}>
      <div className={styles.logo}>
        <Link className={styles.logoLink} to="/">
          Logo
        </Link>
      </div>
      <ul mode="inline" className={styles.menubar}>
        {menuItems.map((item) => {
          return (
            <li key={item.id} className={styles.items}>
              <NavLink state={item.title} className={(({isActive})=>isActive? `${styles.itemLink} ${styles.active}` : styles.itemLink )} to={item.path}>
                {item.title}
              </NavLink>
            </li> 
          );
        })}
      </ul>
      <div className={styles.button}>
        <Button handleClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Navbar);
