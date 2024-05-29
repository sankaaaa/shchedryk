// App.js
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Singers from "./pages/Singers";
import Directors from "./pages/Directors";
import MainPage from "./pages/MainPage";
import Header from '../src/pageComponents/Header';
import './App.css';
import Footer from "./pageComponents/Footer";

function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    return (
        <BrowserRouter>
            <Header toggleMenu={toggleMenu} isOpen={isOpen}/>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <Link to="/singers" onClick={toggleMenu}>Singers</Link>
                <Link to="/directors" onClick={toggleMenu}>Directors</Link>
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`}></div>
            <Routes>
                <Route path="/singers" element={<Singers/>}/>
                <Route path="/directors" element={<Directors/>}/>
                <Route path="/" element={<MainPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
