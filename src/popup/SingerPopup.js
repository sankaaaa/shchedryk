import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/popup.css';
import supabase from "../config/supabaseClient";

const SingerPopup = ({ singer, closePopup }) => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userRoleFromLocalStorage = localStorage.getItem('userRole');
        setUserRole(userRoleFromLocalStorage);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this singer?");

        if (confirmDelete) {
            const { error } = await supabase
                .from('singer')
                .delete()
                .eq('id_singer', singer.id_singer);
            if (error) {
                console.error("Error deleting singer:", error.message);
            } else {
                console.log("Singer deleted successfully");
                closePopup();
                window.location.reload();
            }
        }
    };

    const handleEdit = () => {
        navigate(`/singers/${singer.id_singer}`);
    };

    return (
        <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-details">
                    <div className="popup-text">
                        <h2>{singer.singer_lastname} {singer.singer_name} {singer.singer_patron}</h2>
                        <p>Voice: {singer.voice}</p>
                        <p>Date of birth: {formatDate(singer.date_birth)}</p>
                        <p>About me: {singer.singer_bio}</p>
                        {userRole && (
                            <>
                                <button id="edit-but" onClick={handleEdit}>Edit Singer</button>
                                <button id="delete-but" onClick={handleDelete}>Delete Singer</button>
                            </>
                        )}
                    </div>
                    <div className="popup-image">
                        <img src={singer.image_url} alt={`${singer.singer_name} ${singer.singer_lastname}`} />
                    </div>
                </div>
                <div>
                    <button className="close-popup" onClick={closePopup}>❌</button>
                </div>
            </div>
        </div>
    );
}

export default SingerPopup;
