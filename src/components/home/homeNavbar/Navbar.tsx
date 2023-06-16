import { NavLink } from "react-router-dom";

import "./NavBar.css"

const Navbar = () => {
  return (
    <>
      <nav className="nav">
       
        <div className="logo">Logo</div>
        <div className="menu">
          <NavLink to="/signup">Sign up</NavLink>
          <NavLink to="/login">Login</NavLink>
        
        </div>
      </nav>
    </>
  );
};

export default Navbar;
