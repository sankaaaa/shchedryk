import '../styles/popup.css';

const TrialRehearsalPopup = ({ signup, closePopup }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-details">
                    <div className="popup-text">
                        <h2>{signup.user_surname} {signup.user_name} {signup.user_patronymic}</h2>
                        <p>Birth Date: {formatDate(signup.birth_date)}</p>
                        <p>Email: {signup.user_email}</p>
                        <p>Phone Number: {signup.user_phone_num}</p>
                        <p>Chosen Rehearsal: {formatDateTime(signup.chosen_rehearsal)}</p>
                    </div>
                </div>
                <div>
                    <button className="close-popup" onClick={closePopup}>❌</button>
                </div>
            </div>
        </div>
    );
}

export default TrialRehearsalPopup;