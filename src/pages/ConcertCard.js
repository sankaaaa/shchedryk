import React from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import '../styles/concertSchedule.css';

// Concert card class which is clickable object (if concert have a link) with all info about concert and ability to edit/delete concert
const ConcertCard = ({ concert, fetchConcerts, userRole }) => {
    const navigate = useNavigate();

    // Handling edit button redirecting to appropriate page with specific id
    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/editConcert/${concert.id_conc}`);
    };
   // Handling delete
    const handleDelete = async (e) => {
        e.stopPropagation();
        const confirmDelete = window.confirm('Are you sure you want to delete this concert?');
        if (confirmDelete) {
            const { error } = await supabase
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
    // Function to open link in browser
    const openLink = () => {
        if (concert.link) {
            window.open(concert.link, '_blank');
        }
    };

    // HTML code
    return (
        // Realisation of clickability of the card, with check of link(might be null), and making it unclickable if there is no link
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
            {(userRole !== 'conductor' && userRole !== 'pianist' && userRole !== 'teacher') && (
                <>
                    <button onClick={handleEdit} className="edit-button">Edit</button>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </>
            )}
        </div>
    );
};

export default ConcertCard;