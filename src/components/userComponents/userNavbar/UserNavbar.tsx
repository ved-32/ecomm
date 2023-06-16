import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Logout } from "../../../state/actions/authAction";

import "./UserNavbar.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartItems = useSelector((state: any) => state.CartReducer.totalQuantity);
  const user = useSelector((state: any) => state.AuthReducer.user);

  //for logout
  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <>
      <div className="user_navbar">
        {!user && (
          <>
            <div className="">
              <NavLink to="/user-dashboard" className="link">
                Home
              </NavLink>
            </div>
            <div className="">
              <NavLink to="/signup" className="link">
                Signup
              </NavLink>
            </div>

            <div className="">
              <NavLink to="/user-profile" className="link">
                Login
              </NavLink>
            </div>
          </>
        )}

        {user && (
          <>
            <div className="">
              <p style={{fontSize:"15px"}}>Hello,</p>
              <NavLink to="/user-profile" className="link">
                {user.firstName}
              
              </NavLink>
            </div>
            <div className="">
              <NavLink to="/user-dashboard" className="link">
                Home
              </NavLink>
            </div>
            <div className="">
              <NavLink to="/user-profile" className="link">
                Profile
              </NavLink>
            </div>
            <div className="">
              <NavLink to="/cart" className="link">
                Cart <span>({getCartItems})</span>
              </NavLink>
            </div>

            <div className="">
              {" "}
              <NavLink to="/user-address" className="link">
                Add Address
              </NavLink>
            </div>
            <div className="logout">
              <button onClick={() => handleLogout()}>Logout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserNavbar;
