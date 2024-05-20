import '../styles/popup.css';

const SingerPopup = ({singer, closePopup}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-details">
                    <div className="popup-text">
                        <h2>{singer.singer_lastname} {singer.singer_name} {singer.singer_patron}</h2>
                        <p>Voice: {singer.voice}</p>
                        <p>Date of birth: {formatDate(singer.date_birth)}</p>
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
