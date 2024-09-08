import React from "react";
import './Layout.css';
import Navbar from './Navbar';
import SidebarContent from './SidebarContent';
import SearchBar from './SearchBar';
import Footer from './footer';
const Layout = ({elections,setFilteredElections}) =>{
    return(
        <div className="App">
        <Navbar elections={elections} setFilteredElections={setFilteredElections}/>
        <SearchBar/>
        <SidebarContent/>
        <Footer/>
      </div>
    )
}
export default Layout;