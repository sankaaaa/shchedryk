import {useState} from 'react';
import TrialRehearsalPopup from '../popup/TrialRehearsalPopup';
import '../styles/signup-card.css';

const RehearsalSignupCard = ({signup}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <div className="signup-card" onClick={openPopup}>
                <div className="left-signup-card">
                    <h3>{signup.user_name} {signup.user_surname}</h3>
                    <p>Rehearsal Date: {formatDate(signup.chosen_rehearsal)}</p>
                </div>
            </div>
            {isPopupOpen && <TrialRehearsalPopup signup={signup} closePopup={closePopup}/>}
        </>
    )
}

export default RehearsalSignupCard;