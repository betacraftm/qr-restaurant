import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import getTheme from "./utils/getTheme";
import Test from "./pages/test";
const App = () => {
  // get theme data from local storage
  useEffect(() => {
    getTheme();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
