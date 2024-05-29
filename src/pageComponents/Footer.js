import React from 'react';
import "../styles/footer.css";
import inst11 from '../images/inst11.png';
import tg11 from '../images/tg11.png';
import fb11 from '../images/fb11.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} SHCHEDRYK. All rights reserved.</p>
                <div className="contacts">
                    <p>Contacts</p>
                    +380 95 823 45 44 ||
                    +380 98 821 45 89
                </div>
                <div className="emails">
                    shchedryk@gmail.com
                </div>
                <div className="media-icons">
                    <a href="https://www.instagram.com/shchedryk_choir/" target="_blank" rel="noopener noreferrer">
                        <img src={inst11} alt="instagram"/>
                    </a>
                    <a href="https://pirates.disney.com/" target="_blank" rel="noopener noreferrer">
                        <img src={tg11} alt="telegram"/>
                    </a>
                    <a href="https://www.facebook.com/search/top/?q=shchedryk%2C%20kyiv%20children%E2%80%99s%20choir"
                       target="_blank" rel="noopener noreferrer">
                        <img src={fb11} alt="facebook"/>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
