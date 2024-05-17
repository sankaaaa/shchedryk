import '../styles/singer-card.css';
import { useState } from 'react';
import Popup from '../popup/SingerPopup';

const SingerCard = ({ singer }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    return (
        <>
            <div className="singer-card" onClick={openPopup}>
                <div className="left-singer-card">
                    <h3>{singer.singer_name} {singer.singer_lastname}</h3>
                    <p>Voice: {singer.voice}</p>
                    <p>Date of birth: {singer.date_birth}</p>
                </div>
                <div className="right-singer-card">
                    <img src={singer.image_url} alt={`${singer.singer_name} ${singer.singer_lastname}`} />
                </div>
            </div>
            {isPopupOpen && <Popup singer={singer} closePopup={closePopup} />}
        </>
    )
}

export default SingerCard;
