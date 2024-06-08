import React, {useState} from 'react';
import supabase from "../config/supabaseClient";
import "../styles/add-form.css";
import {useNavigate} from "react-router-dom";

const AddSinger = () => {
    //initialize navigate for redirecting after form submission and states from each variable from db
    const navigate = useNavigate();
    const [id_singer, setIdSinger] = useState('');
    const [singer_name, setSingerName] = useState('');
    const [singer_lastname, setSingerLastname] = useState('');
    const [singer_patron, setSingerPatron] = useState('');
    const [date_birth, setDateBirth] = useState('');
    const [voice, setVoice] = useState('');
    const [image_url, setSingerURL] = useState('');
    const [singer_bio, setBIO] = useState('');
    const [formError, setFormError] = useState(null);

    //handle text input changes and prevent numbers
    const handleTextChange = (setter) => (e) => {
        const {value} = e.target;
        if (!/\d/.test(value)) {
            setter(value);
        }
    };

    //handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const birthDate = new Date(date_birth);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        if (!id_singer || !singer_name || !singer_lastname || !singer_patron || !date_birth || !voice || !image_url || !singer_bio) {
            setFormError('Please fill in all fields correctly!');
            return;
        }

        if (age < 12 || age > 40) {
            setFormError('Singer must be between 12 and 40 years old!');
            return;
        }

        //insert new director into the database
        const {data, error} = await supabase
            .from('singer')
            .insert([{
                id_singer,
                singer_name,
                singer_lastname,
                singer_patron,
                date_birth,
                voice,
                image_url,
                singer_bio
            }]);

        if (error) {
            console.log(error);
            setFormError('Error adding singer. Please try again.');
        } else {
            setFormError(null);
            navigate('/singers');
        }
    };

    return (
        <div className="add_singer-container">
            <h2>Add New Singer</h2>
            <form onSubmit={handleSubmit}>
                <label>Singer ID:</label>
                <input
                    type="text"
                    id="id_singer"
                    value={id_singer}
                    onChange={(e) => setIdSinger(e.target.value)}
                    required
                />
                <label>First name:</label>
                <input
                    type="text"
                    id="singer_name"
                    value={singer_name}
                    onChange={handleTextChange(setSingerName)}
                    required
                />
                <label>Last name:</label>
                <input
                    type="text"
                    id="singer_lastname"
                    value={singer_lastname}
                    onChange={handleTextChange(setSingerLastname)}
                    required
                />
                <label>Patronymic:</label>
                <input
                    type="text"
                    id="singer_patron"
                    value={singer_patron}
                    onChange={handleTextChange(setSingerPatron)}
                    required
                />
                <label>Birth date:</label>
                <input
                    type="date"
                    id="date_birth"
                    value={date_birth}
                    onChange={(e) => setDateBirth(e.target.value)}
                    required
                />
                <label>Voice:</label>
                <select
                    id="voice"
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    required
                >
                    <option value="">Select voice type</option>
                    <option value="alto first">Alto First</option>
                    <option value="alto second">Alto Second</option>
                    <option value="soprano first">Soprano First</option>
                    <option value="soprano second">Soprano Second</option>
                    <option value="bass">Bass</option>
                </select>
                <label>Image URL:</label>
                <input
                    type="url"
                    id="image_url"
                    value={image_url}
                    onChange={(e) => setSingerURL(e.target.value)}
                    required
                />
                <label>Singer bio:</label>
                <input
                    type="text"
                    id="singer_bio"
                    value={singer_bio}
                    onChange={(e) => setBIO(e.target.value)}
                    required
                />
                <button type="submit">Add Singer</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default AddSinger;
