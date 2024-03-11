import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import CreateItemPage from "./pages/CreateItemPage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ItemPage from "./pages/ItemPage";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <LandingPage />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateItemPage />
            </RequireAuth>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
