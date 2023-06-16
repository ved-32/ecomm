import UserNavbar from '../userNavbar/UserNavbar'

import UserAllProducts from '../allProducts/UserAllProducts'

import "../userNavbar/UserNavbar.css"

const UserDashboard = () => {
  return (
    <div>
     <div className="welcom_user"><h1>Welcome to user dashboard</h1> </div>
      <UserNavbar/>
    
      <UserAllProducts/>
    </div>
  )
}

export default UserDashboard
