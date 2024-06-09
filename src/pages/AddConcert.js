import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/addConcert.css';
// Class of concert adding page on which you can go from concert schedule page
const AddConcert = () => {
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [newId, setNewId] = useState('');

    // Handling adding concert after filling the information
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !country || !description || !address) {
            setError('Please fill in all fields.');
            return;
        }

        const { error } = await supabase
            .from('concert')
            .insert([{ id_conc: newId, date, country, description, address, link }]);

        if (error) {
            setError('Error adding concert.');
            console.error(error);
        } else {
            navigate('/concertSchedule');
        }
    };
    //HTML code of the form
    return (
        <div className="form-container">
            <h2 className="form-title">Add New Concert</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="link">Link (optional):</label>
                    <input
                        type="url"
                        id="link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <button type="submit">Add Concert</button>
            </form>
        </div>
    );
};

export default AddConcert;