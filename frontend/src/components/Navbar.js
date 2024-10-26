import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ elections, setFilteredElections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(elections);
    const filtered = elections.filter(
      (election) =>
        (election.title &&
          election.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (election.description &&
          election.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (election.id &&
          election.id.toString()
            .toLowerCase()
            .includes(searchQuery.toString().toLowerCase()))
    );
    setFilteredElections(filtered.length > 0 ? filtered : elections);
  }, [searchQuery, elections, setFilteredElections]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-search">
        <div className="logo">VoteChain</div>
        <div className="search">
          <input
            type="text"
            placeholder="Search Elections..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="common">
        <NavLink to="/" activeClassName="active">
          Connect Wallet
        </NavLink>
      </div>
      <div className="common">
        <NavLink to="/election" activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="common">
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
      </div>
      <div className="common">
        <NavLink to="/Approvals" activeClassName="active">
          Admin
        </NavLink>
      </div>
      <div className="election-button election-button-main">
        <Link to="/creation" className="button">
          Create Election
        </Link>
      </div>
      <div className="handbargermenu" onClick={handleClick}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <ul className={`ul-container ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/">Connect Wallet</Link>
        </li>
        <li>
          <Link to="/Result/16">Elections</Link>
        </li>
        <li>
          <Link to="/Register/6">Dashboard</Link>
        </li>
        <li>
          <Link to="/candidate/6">Admin</Link>
        </li>
        <li>
          <div className="election-button">
            <Link to="/creation" className="button">
              Create Election
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
