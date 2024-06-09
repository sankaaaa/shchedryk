import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import supabase from "../config/supabaseClient";

const EditSinger = () => {
    //initialize navigate for redirecting after form submission and states from each variable from db
    const navigate = useNavigate();
    const {id_singer} = useParams(); // Get id_singer from route params
    const [singer_name, setSingerName] = useState('');
    const [singer_lastname, setSingerLastname] = useState('');
    const [singer_patron, setSingerPatron] = useState('');
    const [date_birth, setDateBirth] = useState('');
    const [voice, setVoice] = useState('');
    const [image_url, setSingerURL] = useState('');
    const [singer_bio, setBIO] = useState('');
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        //fetch the singer's data from the database based on the singer ID
        const fetchSinger = async () => {
            const {data, error} = await supabase
                .from('singer')
                .select()
                .eq('id_singer', id_singer)
                .single();

            if (error) {
                navigate('/singers', {replace: true});
            } else {
                setSingerName(data.singer_name);
                setSingerLastname(data.singer_lastname);
                setSingerPatron(data.singer_patron);
                setDateBirth(data.date_birth);
                setVoice(data.voice);
                setSingerURL(data.image_url);
                setBIO(data.singer_bio);
            }
        };
        fetchSinger();
    }, [id_singer, navigate]);

    const handleTextChange = (setter) => (e) => {
        const {value} = e.target;
        setter(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const birthDate = new Date(date_birth);
        const age = new Date().getFullYear() - birthDate.getFullYear();

        if (!singer_name || !singer_lastname || !singer_patron || !date_birth || !voice || !image_url || !singer_bio) {
            setFormError('Please fill in all fields correctly!');
            return;
        }

        if (age < 12 || age > 40) {
            setFormError('Singer must be between 12 and 40 years old!');
            return;
        }

        const {data, error} = await supabase
            .from('singer')
            .update({
                singer_name,
                singer_lastname,
                singer_patron,
                date_birth,
                voice,
                image_url,
                singer_bio
            })
            .eq('id_singer', id_singer);

        if (error) {
            console.log(error);
            setFormError('Error editing singer. Please try again.');
        } else {
            setFormError(null);
            navigate('/singers');
        }
    };

    return (
        <div className="add_singer-container">
            <h2>Edit singer</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Edit Singer</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
};

export default EditSinger;
