import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import Singers from "./pages/Singers";
import Directors from "./pages/Directors";
import MainPage from "./pages/MainPage";
import Header from './pageComponents/Header';
import './App.css';
import Footer from "./pageComponents/Footer";
import Login from "./pages/Login";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

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
                <Link to="/main" onClick={toggleMenu}>Main</Link>
                <Link to="/singers" onClick={toggleMenu}>Singers</Link>
                <Link to="/directors" onClick={toggleMenu}>Directors</Link>
                <Link to="/login" id="loginLink" onClick={toggleMenu}>Login</Link>
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`}></div>
            <RoutesComponent authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </BrowserRouter>
    );
}

function RoutesComponent({authenticated, setAuthenticated}) {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/main"/>}/>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
                <Route path="/singers" element={<Singers/>}/>
                <Route path="/directors" element={<Directors/>}/>
                <Route path="/main" element={<MainPage/>}/>
            </Routes>
            {location.pathname !== '/login' && <Footer/>}
        </>
    );
}

export default App;
