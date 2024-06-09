import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/concertSchedule.css';

const ConcertCard = ({concert, fetchConcerts}) => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const userRoleFromLocalStorage = localStorage.getItem('userRole');
        setUserRole(userRoleFromLocalStorage);
    }, []);

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/editConcert/${concert.id_conc}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm('Are you sure you want to delete this concert?');
        if (confirmDelete) {
            const {error} = await supabase
                .from('concert')
                .delete()
                .eq('id_conc', concert.id_conc);

            if (error) {
                console.error('Error deleting concert:', error.message);
            } else {
                fetchConcerts();
            }
        }
    };

    const openLink = () => {
        if (concert.link) {
            window.open(concert.link, '_blank');
        }
    };

    return (
        <div className={`concert-card ${!concert.link ? 'not-clickable' : ''}`} onClick={openLink}>
            <h3>{new Date(concert.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}</h3>
            <p><strong>Country:</strong> {concert.country}</p>
            <p><strong>Description:</strong> {concert.description}</p>
            <p><strong>Address:</strong> {concert.address}</p>
            {!concert.link ? (
                <p className="link-info"><strong>No link available</strong></p>
            ) : (
                <p className="link-info"><strong>Link:</strong> Click to open</p>
            )}
            {userRole && (
                <div className="buttons">
                    <button onClick={handleEdit} className="ed-button">Edit</button>
                    <button onClick={handleDelete} className="del-button">Delete</button>
                </div>
            )}
        </div>
    );
};

export default ConcertCard;
