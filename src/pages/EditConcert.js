import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/editConcert.css';

// Concert editing class, where according to on which card you clicked on edit you get needed info and can change on which you need
const EditConcert = () => {
    const {id_conc} = useParams();
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Getting concert info according to id of chosen concert
        const fetchConcert = async () => {
            const {data, error} = await supabase
                .from('concert')
                .select()
                .eq('id_conc', id_conc)
                .single();

            if (error) {
                console.log(error)
            } else {
                setDate(data.date);
                setCountry(data.country);
                setDescription(data.description);
                setAddress(data.address);
                setLink(data.link);
            }
        };
        fetchConcert();
    }, [id_conc, navigate]);

    // Handling submit with saving all the edits
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!date || !country || !description || !address) {
                setError('Please fill in all fields.');
                return;
            }

            const {error} = await supabase
                .from('concert')
                .update({date, country, description, address, link})
                .eq('id_conc', id_conc);

            if (error) {
                throw error;
            }

            navigate('/concertSchedule');
        } catch (error) {
            setError('Error updating concert.');
            console.error(error);
        }
    };
    // HTML code with the similar form as in adding page but with filled spots with info
    return (
        <div className="form-container">
            <h2>Edit Concert</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label htmlFor="link">Link (optional):</label>
                <input
                    type="url"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit">Update Concert</button>
            </form>
        </div>
    );
};

export default EditConcert;