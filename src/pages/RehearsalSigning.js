import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/rehearsalSigning.css";

const RehearsalSigning = () => {
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');
    const navigate = useNavigate();
    const [singer_name, setSingerName] = useState('');
    const [singer_lastname, setSingerLastname] = useState('');
    const [singer_patron, setSingerPatron] = useState('');
    const [singer_phone, setSingerPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');

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

    const handleTextChange = (setter) => (e) => {
        const { value } = e.target;
        if (/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]*$/.test(value)) {
            setter(value);
        }
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        if (value.startsWith('+') && value.length <= 13 && /^[\d+]*$/.test(value)) {
            setPhoneError('');
            setSingerPhone(value);
        } else {
            setPhoneError('Phone number must start with + and be no more than 13 characters long.');
        }
    };

    const handleBirthDateChange = (e) => {
        const { value } = e.target;
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 4);

        if (selectedDate > minDate) {
            setBirthDateError('Singer must be at least 4 years old.');
        } else {
            setBirthDateError('');
            setBirthDate(value);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('en-GB', options).replace(',', ' at');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (phoneError || birthDateError) {
            return;
        }

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());
        formObject.selectedDate = selectedDate;

        const { error } = await supabase
            .from('rehearsal_signings')
            .insert([
                {
                    user_name: formObject.name,
                    user_surname: formObject.surname,
                    user_patronymic: formObject.patronymic,
                    user_email: formObject.email,
                    user_phone_num: formObject.phone,
                    chosen_rehearsal: selectedDate,
                    birth_date: formObject.birth_date
                }
            ]);

        if (error) {
            console.error('Error inserting data:', error);
        } else {
            setSubmitted(true);
        }
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
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={singer_name}
                                onChange={handleTextChange(setSingerName)}
                                required />
                        </div>
                        <div>
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={singer_lastname}
                                onChange={handleTextChange(setSingerLastname)}
                                required />
                        </div>
                        <div>
                            <label htmlFor="patronymic">Patronymic</label>
                            <input
                                type="text"
                                id="patronymic"
                                name="patronymic"
                                value={singer_patron}
                                onChange={handleTextChange(setSingerPatron)}
                                required />
                        </div>
                        <div>
                            <label htmlFor="birth_date">Birth Date</label>
                            <input
                                type="date"
                                id="birth_date"
                                name="birth_date"
                                value={birthDate}
                                onChange={handleBirthDateChange}
                                required />
                            {birthDateError && <p className="error">{birthDateError}</p>}
                        </div>
                        <div>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={singer_phone}
                                onChange={handlePhoneChange}
                                required />
                            {phoneError && <p className="error">{phoneError}</p>}
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
                    <p>You've been successfully signed for a trial rehearsal, we'll contact you via e-mail or call you
                        later on!</p>
                    <button onClick={handleBackToMainPage}>Back to main page</button>
                </div>
            )}
        </div>
    );
}
export default RehearsalSigning;