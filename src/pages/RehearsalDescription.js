import supabase from "../config/supabaseClient";
import React from "react";
import {useNavigate} from 'react-router-dom';
import "../styles/rehearsalDescription.css";

const RehearsalDescription = () => {
    //get navigate function from useNavigate hook
    const navigate = useNavigate();

    //function to handle navigation back to the main page
    const handleBackToMenu = () => {
        navigate('/main');
    };

    //render the rehearsal description content
    return (
        <div className="centered-box-container">
            <div className="centered-box">
                <h2>How is rehearsal process going?</h2>
                <p>
                    First of all, there is two types of rehearsals: first type is weekday rehearsals (wednesday and
                    friday) on
                    which choir is working on small specific places in different songs trying to get the best emotional
                    and
                    technical result, second type is sundays rehearsals where we make accent on trying to sing the whole
                    song
                    trying to use everything we know, adding work we've done on weekdays, also if we have a new song, we
                    are learning it
                    on sundays.
                </p>
                <p>
                    If it's your first rehearsal, you will be listened by one of the directors, who will decide which
                    type of voice you have,
                    and show you your place in classroom. At the first 15-20 minutes of rehearsal we have a voice
                    workout and then you will be having an experience
                    of a first impression, of how it is to be a part of our art, which is not easy but really rewarding
                    work.
                </p>
                <p className="red-paragraph">
                    Whether you want to visit our concert, try to go on a rehearsal, or just a random stranger, who
                    accidentally clicked
                    on our site, we hope that you will like our work, and understand the main reason we are
                    participating in all that -
                    we love to sing!)))
                </p>
                <button onClick={handleBackToMenu} className="back-button">Back to Menu</button>
            </div>
        </div>
    );
}

export default RehearsalDescription;