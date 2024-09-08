import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './Navbar.css'

function Navbar({ elections, setFilteredElections }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);  // Add state to handle menu visibility

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredElections(elections);
        } else {
            const filtered = elections.filter(election =>
                (election.name && election.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (election.description && election.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredElections(filtered.length > 0 ? filtered : elections);
        }
    }, [searchQuery, elections, setFilteredElections]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (searchQuery.trim() === '') {
            setFilteredElections(elections);
        } else {
            const filtered = elections.filter(election =>
                (election.title && election.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (election.description && election.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredElections(filtered.length > 0 ? filtered : elections);
        }
    };

    function handleClick() {
        setMenuOpen(!menuOpen);  // Toggle menu visibility state
    }

    return (
        <nav className="navbar">
            <div className="logo-search">
                <div className="logo"></div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search Elections..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="election-button">
                <Link to="/creation" className="button">Create Election</Link>
            </div>
            <div className="handbargermenu" onClick={handleClick}>
                <i className="fa-solid fa-bars"></i>
            </div>

            {/* Add the menu and toggle its visibility based on menuOpen */}
            <ul className={`ul-container ${menuOpen ? 'open' : ''}`}>
                <li><Link to="/">Connect wallet</Link></li>
                <li><Link to="/election">Elections</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/Approvals">Admin</Link></li>
                <li>
                        <Link to="/creation" className="button">Create Election</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
