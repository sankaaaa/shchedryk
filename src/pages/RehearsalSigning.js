import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import "../styles/rehearsalSigning.css";
const RehearsalSigning = () => {
 const [dates, setDates] = useState([]);
 const [selectedDate, setSelectedDate] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const navigate = useNavigate();
    useEffect(() => {
        fetchRehearsalDates();
    }, []);

    const fetchRehearsalDates = async () => {
        const { data, error } = await supabase
            .from('rehearsal')
            .select('date')
            .gt('date', new Date().toISOString());

        if (error) {
            console.error('Error fetching dates:', error);
        } else {
            setDates(data.map(item => item.date));
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('en-GB', options).replace(',', ' at');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());
        formObject.selectedDate = selectedDate;

        console.log(formObject);

        setSubmitted(true);
    };
    const handleBackToMainPage = () => {
        navigate('/main');
    };
    return (
        <div className="rehearsal_signing-container">
            {!submitted ? (
                <>
                    <h2 className="form-title">Sign for a Trial Rehearsal</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div>
                            <label htmlFor="surname">Surname</label>
                            <input type="text" id="surname" name="surname" required />
                        </div>
                        <div>
                            <label htmlFor="patronymic">Patronymic</label>
                            <input type="text" id="patronymic" name="patronymic" required />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required />
                        </div>
                        <div>
                            <label htmlFor="date">Preferred Rehearsal Date</label>
                            <select
                                id="date"
                                name="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                required
                            >
                                <option value="">Select a date</option>
                                {dates.map((date, index) => (
                                    <option key={index} value={date}>
                                        {formatDate(date)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </>
            ) : (
                <div className="submitted-message">
                    <p>You've been successfully signed for a trial rehearsal, we'll contact you via e-mail or call you later on!</p>
                    <button onClick={handleBackToMainPage}>Back to main page</button>
                </div>
            )}
        </div>
    );
}
export default RehearsalSigning;