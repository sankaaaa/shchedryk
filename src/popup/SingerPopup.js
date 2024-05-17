import '../styles/popup.css';

const SingerPopup = ({singer, closePopup}) => {
    return (
        <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-details">
                    <div className="popup-text">
                        <h2>{singer.singer_name} {singer.singer_lastname}</h2>
                        <p>Voice: {singer.voice}</p>
                        <p>Date of birth: {singer.date_birth}</p>
                    </div>
                    <div className="popup-image">
                        <img src={singer.image_url} alt={`${singer.singer_name} ${singer.singer_lastname}`}/>
                    </div>
                </div>
                <button onClick={closePopup}>❌</button>
            </div>
        </div>
    );
}

export default SingerPopup;
