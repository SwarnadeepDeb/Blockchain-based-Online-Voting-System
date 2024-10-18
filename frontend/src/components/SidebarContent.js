import React from 'react'
import { Outlet, NavLink } from "react-router-dom";
import './SidebarContent.css'

function SidebarContent() {
  return (
    <div className="sidebar-content">
      <Outlet />
    </div>
  )
}

export default SidebarContent;
