import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";

const EditDirector = () => {
    //initialize navigate for redirecting after form submission and states from each variable from db
    const navigate = useNavigate();
    const {id_dir} = useParams();
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

    useEffect(() => {
        //fetch the director's data from the database based on the director ID
        const fetchSinger = async () => {
            const {data, error} = await supabase
                .from('director')
                .select()
                .eq('id_dir', id_dir)
                .single();

            if (error) {
                navigate('/directors', {replace: true});
            } else {
                //set the state with the fetched data
                setDirName(data.dir_name);
                setDirLastname(data.dir_lastname);
                setDirPatron(data.dir_patron);
                setDateBirth(data.date_birth);
                setDateStart(data.date_start);
                setRole(data.role);
                setStudy(data.study);
                setPhone(data.phone_number);
                setEmail(data.email);
                setCity(data.city);
                setStreet(data.street);
                setSingerURL(data.image_url);
                setBIO(data.bio);
            }
        };
        fetchSinger();
    }, [id_dir, navigate]);

    const handleTextChange = (setter) => (e) => {
        const {value} = e.target;
        setter(value);
    };

    //handler to submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const birthDate = new Date(date_birth);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        if (!dir_name || !dir_lastname || !dir_patron || !date_birth || !date_start || !role || !study || !phone_number
            || !email || !street || !city || !image_url || !bio) {
            setFormError('Please fill in all fields correctly!');
            return;
        }

        if (age < 20 || age > 80) {
            setFormError('Singer must be between 12 and 40 years old!');
            return;
        }

        //update the director's data in the database
        const {data, error} = await supabase
            .from('director')
            .update({
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
            })
            .eq('id_dir', id_dir);

        if (error) {
            console.log(error);
            setFormError('Error editing director. Please try again.');
        } else {
            setFormError(null);
            navigate('/directors');
        }
    };

    return (
        <div className="add_singer-container">
            <h2>Edit Director</h2>
            <form onSubmit={handleSubmit}>
                <label>First name:</label>
                <input
                    type="text"
                    id="singer_name"
                    value={dir_name}
                    onChange={handleTextChange(setDirName)}
                    required
                />
                <label>Last name:</label>
                <input
                    type="text"
                    id="singer_lastname"
                    value={dir_lastname}
                    onChange={handleTextChange(setDirLastname)}
                    required
                />
                <label>Patronymic:</label>
                <input
                    type="text"
                    id="singer_patron"
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
                <label>Image URL:</label>
                <input
                    type="url"
                    id="image_url"
                    value={image_url}
                    onChange={(e) => setSingerURL(e.target.value)}
                    required
                />
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
                <label>Bio:</label>
                <input
                    type="text"
                    id="bio"
                    value={bio}
                    onChange={(e) => setBIO(e.target.value)}
                    required
                />
                <button type="submit">Edit Director</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}
export default EditDirector;