import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import '../styles/concertSchedule.css';

const ConcertSchedule = () => {
    const [concerts, setConcerts] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchConcerts = async () => {
            const { data, error } = await supabase
                .from('concert')
                .select('*')
                .gte('date', new Date().toISOString())
                .order('date', { ascending: true });

            if (error) {
                setFetchError('Could not fetch concerts');
                setConcerts([]);
                console.error('Error fetching concerts:', error.message);
            } else {
                setConcerts(data);
                setFetchError(null);
            }
        };

        fetchConcerts();
    }, []);

    return (
        <div className="concert-schedule-page">
            <h1>Our Future Concerts</h1>
            {fetchError && <p>{fetchError}</p>}
            <div className="concerts-grid">
                {concerts.map((concert) => (
                    <div
                        key={concert.id}
                        className={`concert-card ${!concert.link ? 'non-clickable' : ''}`}
                        onClick={() => concert.link && window.open(concert.link, "_blank")}
                    >
                        <h3>{new Date(concert.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}</h3>
                        <p><strong>Country:</strong> {concert.country}</p>
                        <p><strong>Description:</strong> {concert.description}</p>
                        <p><strong>Address:</strong> {concert.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConcertSchedule;