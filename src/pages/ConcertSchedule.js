import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import ConcertCard from '../pages/ConcertCard';
import '../styles/concertSchedule.css';

const ConcertSchedule = () => {
    const [concerts, setConcerts] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        fetchConcerts();
        const userRoleFromLocalStorage = localStorage.getItem('userRole');
        setUserRole(userRoleFromLocalStorage);
    }, []);

    const handleAddConcert = () => {
        navigate('/addConcert');
    };

    return (
        <div className="concert-schedule-page">
            <h1>Our Future Concerts</h1>
            {fetchError && <p>{fetchError}</p>}
            {userRole !== 'conductor' && userRole !== 'pianist' && userRole !== 'teacher' && (
                <button className="add-concert-button" onClick={handleAddConcert}>
                    Add Concert
                </button>
            )}
            <div className="concerts-grid">
                {concerts.map((concert) => (
                    <ConcertCard
                        key={concert.id_conc}
                        concert={concert}
                        fetchConcerts={fetchConcerts}
                        userRole={userRole}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConcertSchedule;