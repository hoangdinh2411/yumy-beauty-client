import HomeLayout from "pages/home/homeLayout";
import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./../hooks/useAuth";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { signOut } from "utils/authServices";
function PrivateRouter() {
  //get auth from state auth that stores in redux
  const auth = useAuth()
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = auth?.token
    if (token) {
      //ma hoa token
      const decodedToken = decode(token);
      //Kiem tra, neu token het han , thi se tu dong log out

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signOut(dispatch, navigate);
      }
    }

    return () => {};
  }, [location,navigate]);

  return auth ? <HomeLayout /> : <Navigate to="/signin" />;
}

export default PrivateRouter;
