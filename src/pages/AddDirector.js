import "../styles/directors.css";
import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AddDirector = () => {
    //initialize navigate for redirecting after form submission and states from each variable from db
    const navigate = useNavigate();
    const [id_dir, setIdDir] = useState('');
    const [dir_name, setDirName] = useState('');
    const [dir_lastname, setDirLastname] = useState('');
    const [dir_patron, setDirPatron] = useState('');
    const [date_birth, setDateBirth] = useState('');
    const [date_start, setDateStart] = useState('');
    const [role, setRole] = useState('');
    const [study, setStudy] = useState('');
    const [phone_number, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [image_url, setSingerURL] = useState('');
    const [bio, setBIO] = useState('');
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

        //if all fields are filled
        if (!id_dir || !dir_name || !dir_lastname || !dir_patron || !date_birth || !date_start || !role || !study
            || !image_url || !bio || !phone_number || !email || !city || !street) {
            setFormError('Please fill in all fields correctly!');
            return;
        }

        //check if the director's age is within the valid range
        if (age < 20 || age > 80) {
            setFormError('Director must be between 20 and 80 years old!');
            return;
        }

        //insert new director into the database
        const {data, error} = await supabase
            .from('director')
            .insert([{
                id_dir,
                dir_name,
                dir_lastname,
                dir_patron,
                date_birth,
                date_start,
                role,
                study,
                phone_number,
                email,
                city,
                street,
                image_url,
                bio
            }]);

        if (error) {
            console.log(error);
            setFormError('Error adding director. Please try again.');
        } else {
            setFormError(null);
            navigate('/directors'); //redirect to the directors page on successful submission
        }
    };

    return (
        <div className="add_singer-container">
            <h2>Add New Director</h2>
            <form onSubmit={handleSubmit}>
                <label>Director ID:</label>
                <input
                    type="text"
                    id="id_dir"
                    value={id_dir}
                    onChange={(e) => setIdDir(e.target.value)}
                    required
                />
                <label>First name:</label>
                <input
                    type="text"
                    id="dir_name"
                    value={dir_name}
                    onChange={handleTextChange(setDirName)}
                    required
                />
                <label>Last name:</label>
                <input
                    type="text"
                    id="dir_lastname"
                    value={dir_lastname}
                    onChange={handleTextChange(setDirLastname)}
                    required
                />
                <label>Patronymic:</label>
                <input
                    type="text"
                    id="dir_patron"
                    value={dir_patron}
                    onChange={handleTextChange(setDirPatron)}
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
                <label>Start date:</label>
                <input
                    type="date"
                    id="date_start"
                    value={date_start}
                    onChange={(e) => setDateStart(e.target.value)}
                    required
                />
                <label>Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Select role</option>
                    <option value="conductor">Conductor</option>
                    <option value="pianist">Pianist</option>
                    <option value="teacher">Teacher</option>
                </select>
                <label>Education:</label>
                <input
                    type="text"
                    id="study"
                    value={study}
                    onChange={handleTextChange(setStudy)}
                    required
                />
                <label>Phone number:</label>
                <input
                    type="tel"
                    id="phone_number"
                    value={phone_number}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <label>Street:</label>
                <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                />
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
                    id="bio"
                    value={bio}
                    onChange={(e) => setBIO(e.target.value)}
                    required
                />
                <button type="submit">Add Director</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
export default AddDirector;
