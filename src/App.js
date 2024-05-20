import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Singers from "./pages/Singers";
import Directors from "./pages/Directors";
import './App.css';

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <BrowserRouter>
            <nav>
                <h2 className="title">SHCHEDRYK</h2>
                <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger"></div>
                </div>
            </nav>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <Link to="/singers" onClick={toggleMenu}>Singers</Link>
                <Link to="/directors" onClick={toggleMenu}>Directors</Link>
            </div>
            <Routes>
                <Route path="/singers" element={<Singers />} />
                <Route path="/directors" element={<Directors />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
