import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToastMessage, hideToast } from "../store/appSlice";

export const Toast = () => {
  const message = useSelector(selectToastMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      dispatch(hideToast());
    }, 2200);
    return () => clearTimeout(timer);
  }, [message, dispatch]);

  return (
    <div className={`toast ${message ? "show" : ""}`} id="toast" role="status">
      {message}
    </div>
  );
};

export default Toast;
