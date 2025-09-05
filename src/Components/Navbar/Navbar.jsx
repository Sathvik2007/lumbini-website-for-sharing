import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle sticky navbar on scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  // Toggle mobile menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close menu when a nav link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <Link to="/" className="logo" onClick={closeMenu}>Lumbini Technologies</Link>

      <div 
        className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`navbar ${menuOpen ? 'show' : ''}`}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Home</Link>
        <Link to="/About" className={location.pathname === '/About' ? 'active' : ''} onClick={closeMenu}>About Us</Link>
        <Link to="/ServicePage" className={location.pathname === '/ServicePage' ? 'active' : ''} onClick={closeMenu}>Services</Link>
        <Link to="/Products" className={location.pathname === '/Products' ? 'active' : ''} onClick={closeMenu}>Products</Link>
        <Link to="/Contact" className={location.pathname === '/Contact' ? 'active' : ''} onClick={closeMenu}>Contact</Link>
        <Link to="/Login" className={location.pathname === '/Login' ? 'active' : ''} onClick={closeMenu}>Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;