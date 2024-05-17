import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Singers from "./pages/Singers";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <h2 className="title">SHCHEDRYK</h2>
                <Link to="/">Singers</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Singers/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
