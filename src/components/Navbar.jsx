import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/store'

const Navbar = () => {
  const navigate = useNavigate()
  const { isLogin, role,setIsLogin, setUsername, setUserId, setEmail, setIsAlert, setAlertMsg, setAlertType, Username } = useUserStore();
  const logout = () => {
    setIsLogin(false);
    setUsername("");
    setUserId("");
    setEmail("");
    setIsAlert(true);
    localStorage.removeItem("crime-tracker-token");
    setAlertType("success");
    setAlertMsg("Logged Out Successfully");
    navigate('/login');
  }
  return (
    <div className="navbar bg-base-300 text-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/crimes' >Crime Details</Link></li>
            <li><Link to='/victims'>Victims</Link></li>

          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Crime Tracker</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/crimes'>Crimes</Link></li>
          <li><Link to='/suspects'>Suspects</Link></li>
          <li><Link to='/victims'>Victims</Link></li>
        </ul>
      </div>
      <div className="navbar-end">

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-neutral btn-circle avatar placeholder">
            <div className="w-10 rounded-full">
              <span>{Username[0].toUpperCase()}</span>
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </div>

      </div>

    </div >
  )
}

export default Navbar
