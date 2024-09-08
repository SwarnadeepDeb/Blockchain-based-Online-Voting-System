import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import './SidebarContent.css'

function SidebarContent() {
  return (
    <div className="sidebar-content">
      <div className="sidebar">
        <div className="uppericons">
          <div className="common"><NavLink to="/" activeClassName="active"><i className="fa-solid fa-wallet"></i></NavLink></div>
          <div className="common"><NavLink to="/election" activeClassName="active"><i className="fas fa-home"></i></NavLink></div>
          <div className="common"><NavLink to="/dashboard" activeClassName="active"><i className="fa-solid fa-tv"></i></NavLink></div>
        </div>
        <div className="lowericon">
          <div className="common"><NavLink to="/Approvals" activeClassName="active"><i className="fas fa-user-shield"></i></NavLink></div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default SidebarContent;
