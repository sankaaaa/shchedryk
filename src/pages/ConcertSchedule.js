 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../config/supabaseClient';
import ConcertCard from '../pages/ConcertCard';
import '../styles/concertSchedule.css';

const ConcertSchedule = () => {
    //states to store concert data and error messages
    const [concerts, setConcerts] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

        //fetch concerts data from the supabase with date greater than or equal to the current date and order by date in ascending order
        const fetchConcerts = async () => {
            const {data, error} = await supabase
                .from('concert')
                .select('*')
                .gte('date', new Date().toISOString())
                .order('date', {ascending: true});

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
    }, []); //empty dependency array to run useEffect only once when component mounts

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