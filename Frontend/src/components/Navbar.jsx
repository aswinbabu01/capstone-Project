import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass, faCartShopping, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setSearchVisible(prev => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: "#D9D9D9" }}>
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand mx-auto mx-md-0" to="/">
          <img src="/src/assets/logo.png" alt="Logo" width="240" height="90" className="rounded" />
        </Link>
        <div className="icons d-flex justify-content-evenly align-items-center">
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} size="2x" style={{ color: '#7C7C7C' }} className="mx-2" />
          </Link>
          <div className="search-container mx-2" style={{ position: 'relative' }}>
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              size="2x" 
              style={{ color: '#7C7C7C', cursor: 'pointer' }} 
              onClick={toggleSearch} 
            />
            {searchVisible && (
              <input 
                type="text" 
                className="form-control position-absolute my-2" 
                style={{ top: '40px', right: '0', width: '200px' }} 
                placeholder="Search..." 
                value={searchTerm}
                onChange={handleSearchChange}
              />
            )}
          </div>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} size="2x" style={{ color: '#7C7C7C' }} className="mx-2" />
          </Link>
          <Link to="/artistpage">
            <FontAwesomeIcon icon={faPaintBrush} size="2x" style={{ color: '#7C7C7C' }} className="mx-2" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
