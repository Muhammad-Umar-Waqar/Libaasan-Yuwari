import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSizeChartOpen,
  setSizeChartOpen,
} from "./store/appSlice";
import {
  selectIsBagDrawerOpen,
  setBagDrawerOpen,
} from "./store/bagSlice";
import GlobalSymbols from "./components/GlobalSymbols";
import SizeChartModal from "./components/SizeChartModal";
import BagDrawer from "./components/BagDrawer";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";

export const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isSizeChartOpen = useSelector(selectSizeChartOpen);
  const isBagOpen = useSelector(selectIsBagDrawerOpen);
  const isScrimOn = isSizeChartOpen || isBagOpen;

  // Listen to hash changes for backwards compatibility with anchor tags
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#checkout") {
        navigate("/checkout");
      } else if (hash === "#sizechart") {
        dispatch(setSizeChartOpen(true));
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => window.removeEventListener("hashchange", handleHash);
  }, [navigate, dispatch]);

  // Handle escape key to dismiss overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch(setSizeChartOpen(false));
        dispatch(setBagDrawerOpen(false));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  // Handle body overflow
  useEffect(() => {
    const isCheckout = location.pathname === "/checkout";
    if (isCheckout || isSizeChartOpen || isBagOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [location.pathname, isSizeChartOpen, isBagOpen]);

  const handleCloseScrim = () => {
    dispatch(setSizeChartOpen(false));
    dispatch(setBagDrawerOpen(false));
  };

  return (
    <>
      <GlobalSymbols />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {/* Global Overlays */}
      <div
        className={`scrim ${isScrimOn ? "on" : ""}`}
        id="scrim"
        onClick={handleCloseScrim}
        aria-hidden="true"
      />
      <SizeChartModal />
      <BagDrawer />
      <Toast />
    </>
  );
};

export default App;
