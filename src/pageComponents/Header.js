import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function Header({toggleMenu, isOpen}) {
    const location = useLocation();

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    return (
        <header>
            <Link to="/" className="title">SHCHEDRYK</Link>
            {location.pathname === '/' && (
                <div className="header-links">
                    <a href="#section2" onClick={(e) => handleScroll(e, 'section2')}>History</a>
                    <a href="#section3" onClick={(e) => handleScroll(e, 'section3')}>Section 3</a>
                    <a href="#section4" onClick={(e) => handleScroll(e, 'section4')}>Section 4</a>
                </div>
            )}
            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="hamburger"></div>
            </div>
        </header>
    );
}

export default Header;
