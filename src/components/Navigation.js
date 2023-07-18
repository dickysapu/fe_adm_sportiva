import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Import logout icon from react-icons

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('Logging out...');
    history.push('/'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src="assets/logoo.png" alt="Logo" />
          </Link>
          <button
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isActive ? 'true' : 'false'}
            onClick={toggleNav}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to="/produk" className="navbar-item">
              Produk
            </Link>
            <Link to="/order" className="navbar-item">
              Order
            </Link>
            <Link to="/pesan" className="navbar-item">
              Pesan
            </Link>
          </div>
          <div className="navbar-end mr-5">
            <div className="navbar-item">
            <button className="button is-light is-inverted" onClick={handleLogout}>
                <span className="icon">
                  <FiLogOut />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
