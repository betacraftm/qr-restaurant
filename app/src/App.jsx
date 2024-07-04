import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import getTheme from "./utils/getTheme";
import Modal from "./components/Modal";
const App = () => {
  useEffect(() => {
    getTheme();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/modal" element={<Modal />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
