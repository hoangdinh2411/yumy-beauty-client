import React from "react";
import styles from "./avatar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import useAuth from 'hooks/useAuth';
import { signOut } from "utils/authServices";
function UserAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth()
  const handleSignOut = () => {
    signOut(dispatch, navigate);
  };
  return (
    <div className={styles.wrapper}>
      {auth?.result?.avatar ? (
        <img
          src={auth?.result?.avatar}
          className={styles.avatar}
          alt="Avatar"
        />
      ) : (
        <p className={styles.avatarByCharacter}>
          {auth?.result?.fullName.charAt(0).toUpperCase()}
        </p>
      )}
      <ul className={styles.subMenu}>
        <li className={styles.items}>
          <FaEdit />
          <NavLink to="/profile" state="Profile" className={styles.link}>
            Edit Profile
          </NavLink>
        </li>
        <li className={styles.items} onClick={handleSignOut}>
          <FaSignOutAlt />
          <span className={styles.link}>Sign Out</span>
        </li>
      </ul>
    </div>
  );
}

export default UserAvatar;
