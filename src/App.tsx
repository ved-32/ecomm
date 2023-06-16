
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/authComponents/login/Login";
import SignUp from "./components/authComponents/signup/Signup";

import AllCategory from "./components/adminComponents/allCategory/AllCategory";
import AdminCategory from "./components/adminComponents/adminCategory/AdminCategory";
import AdminDashboard from "./components/adminComponents/adminDashboard/AdminDashboard";
import AdminAddProducts from "./components/adminComponents/adminProducts/AdminAddProducts";
import AdminAllProducts from "./components/adminComponents/allProducts/AdminAllProducts";

import Cart from "./components/userComponents/userCart/Cart";
import UserProfile from "./components/userComponents/userProfile/UserProfile";
import UserAddress from "./components/userComponents/userAddress/UserAddress";
import UserDashboard from "./components/userComponents/userDashboard/UserDashboard";

import Home from "./components/home/Home";

function App() {
  const getUserFromStore = useSelector((state: any) => state.AuthReducer);
  const { token } = getUserFromStore;
  const { isAdmin } = getUserFromStore.user;

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {isAdmin && token && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/add-category" element={<AdminCategory />} />
              <Route path="/add-product" element={<AdminAddProducts />} />
              <Route path="/view-all-category" element={<AllCategory />} />
              <Route path="/view-all-products" element={<AdminAllProducts />} />
            </>
          )}

          {!isAdmin && token && (
            <>
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/user-address" element={<UserAddress />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
