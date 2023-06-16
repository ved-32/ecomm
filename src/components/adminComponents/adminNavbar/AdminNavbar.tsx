import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch} from "react-redux";

import { Logout } from "../../../state/actions/authAction";

import "./AdminNavbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };
  return (
    <>
      <section className="admim_dashboard_div">
        <div className="admin_menu">
          <NavLink to="/view-all-category" className="link">
            <div>View All Category</div>
          </NavLink>
          <NavLink to="/add-category" className="link">
            <div>add category</div>
          </NavLink>
          <NavLink to="/add-product" className="link">
            <div>Add Products</div>
          </NavLink>
          <NavLink to="/view-all-products" className="link">
            <div>View All Products</div>
          </NavLink>
          <div className="admin_logout_btn" onClick={() => handleLogout()}>Logout</div>
        </div>
      </section>
    </>
  );
};

export default AdminNavbar;
