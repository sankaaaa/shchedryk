import React, {useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom';
import Singers from "./pages/Singers";
import Directors from "./pages/Directors";
import RehearsalSigning from "./pages/RehearsalSigning";
import RehearsalDescription from "./pages/RehearsalDescription"
import RehearsalSchedule from "./pages/RehearsalSchedule"
import TrialRehearsalList from "./pages/TrialRehearsalList";
import MainPage from "./pages/MainPage";
import Header from './pageComponents/Header';
import ConcertSchedule from "./pages/ConcertSchedule"

import './App.css';
import Footer from "./pageComponents/Footer";
import Login from "./pages/Login";
import AddSinger from "./pages/AddSinger";
import EditSinger from "./pages/EditSinger";
import AddDirector from "./pages/AddDirector";
import EditDirector from "./pages/EditDirector";
import AddConcert from "./pages/AddConcert";
import EditConcert from "./pages/EditConcert";
import MyPage from "./pages/MyPage";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserData = localStorage.getItem('userData');

        if (storedUserRole) {
            setUserRole(storedUserRole);
            setAuthenticated(true);
        }

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    const handleSetUserRole = (role) => {
        setUserRole(role);
        localStorage.setItem('userRole', role);
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('userData');
        window.location.reload();
        return <Navigate to="/main"/>;
    };

    return (
        <BrowserRouter>
            <Header toggleMenu={toggleMenu} isOpen={isOpen} userRole={userRole} handleLogout={handleLogout}/>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <Link to="/main" onClick={toggleMenu}>Main</Link>
                <Link to="/singers" onClick={toggleMenu}>Singers</Link>
                <Link to="/directors" onClick={toggleMenu}>Directors</Link>
                {!userRole && (
                    <Link to="/rehearsalSigning" onClick={toggleMenu}>Rehearsal Signing</Link>
                )}
                {userRole && (
                    <Link to="/trialRehearsals" onClick={toggleMenu}>Trial Rehearsals</Link>
                )
                }
                {userRole && (
                    <Link to="/concertSchedule" onClick={toggleMenu}>Concert Schedule</Link>
                )
                }
                {userRole && (
                    <Link to="/rehearsalSchedule" onClick={toggleMenu}>Rehearsal Schedule</Link>
                )
                }
                {userRole && (
                    <Link to="/my-page" onClick={toggleMenu}>My Page</Link>
                )
                }
                {!userRole && (
                    <Link to="/login" id="loginLink" onClick={toggleMenu}>Login</Link>
                )}
                {userRole && (
                    <button className="logout-but" onClick={handleLogout}>Logout</button>
                )}
            </div>
            <div className={`menu-overlay ${isOpen ? 'open' : ''}`}></div>
            <RoutesComponent authenticated={authenticated} setAuthenticated={setAuthenticated}
                             setUserRole={handleSetUserRole}/>
        </BrowserRouter>
    );
}

function RoutesComponent({authenticated, setAuthenticated, setUserRole}) {
    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/main"/>}/>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUserRole={setUserRole}/>}/>
                <Route path="/singers" element={<Singers/>}/>
                <Route path="/directors" element={<Directors/>}/>
                <Route path="/rehearsalSigning" element={<RehearsalSigning/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/rehearsalDescription" element={<RehearsalDescription/>}/>
                <Route path="/rehearsalSchedule" element={<RehearsalSchedule/>}/>
                <Route path="/trialRehearsals" element={<TrialRehearsalList/>}/>
                <Route path="/concertSchedule" element={<ConcertSchedule/>}/>
                <Route path="/addConcert" element={<AddConcert/>}/>
                <Route path="/editConcert/:id" element={<EditConcert/>}/>
                <Route path="/add-singer" element={<AddSinger/>}/>
                <Route path="/singers/:id_singer" element={<EditSinger/>}/>
                <Route path="/add-director" element={<AddDirector/>}/>
                <Route path="/directors/:id_dir" element={<EditDirector/>}/>
                <Route path="/my-page" element={<MyPage/>}/>
            </Routes>
            {location.pathname === '/main' && <Footer/>}
        </>
    );
}

export default App;
