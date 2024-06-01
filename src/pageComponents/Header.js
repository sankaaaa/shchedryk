import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function Header({toggleMenu, isOpen, userRole}) {
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
            <div>
                <Link to="/main" className="title">SHCHEDRYK</Link>
                {userRole && (
                    <div className="user-role">
                        {userRole}
                    </div>
                )}
            </div>
            {location.pathname === '/main' && (
                <div className="header-links">
                    <a href="#section2" onClick={(e) => handleScroll(e, 'section2')}>History</a>
                    <a href="#section3" onClick={(e) => handleScroll(e, 'section3')}>Calendar</a>
                    <a href="#section4" onClick={(e) => handleScroll(e, 'section4')}>Repertoire</a>
                </div>
            )}
            <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="hamburger"></div>
            </div>
        </header>
    );
}

export default Header;
