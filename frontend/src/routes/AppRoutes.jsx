import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../styles/auth.css";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import PartnerLogin from "../pages/auth/PartnerLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import Profile from "../pages/foodPartner/Profile";
import Logout from "../pages/Auth/Logout";
import Nav from "../components/Nav";
import Home from "../pages/general/Home";
import CreateFoodPartner from "../pages/foodPartner/CreateFoodPartner";
import Hero from "../pages/general/Hero";
import { useLocation } from "react-router-dom";
import Saved from "../pages/general/Saved";

const Layout = () => {
  const location = useLocation();

  // ❌ Pages where NAV should NOT appear
  const hideNavRoutes = ["/home", "/food-partner/:id"];

  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/saved" element={<Saved />} />

        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route path="/food-partner/login" element={<PartnerLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/create-food" element={<CreateFoodPartner />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default AppRoutes;
