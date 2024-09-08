import React from 'react'
import './SearchBar.css';

function SearchBar() {
    return (
        <div>
            <div className="container">
                <div className="search1">
                <input type="text" placeholder="Search" />
                <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
