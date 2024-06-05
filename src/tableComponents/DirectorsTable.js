import "../styles/directors.css"
import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DirectorCard = ({director}) => {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    useEffect(() => {
        const userRoleFromLocalStorage = localStorage.getItem('userRole');
        setUserRole(userRoleFromLocalStorage);
    }, []);
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this director?");

        if (confirmDelete) {
            const {error} = await supabase
                .from('director')
                .delete()
                .eq('id_dir', director.id_dir);
            if (error) {
                console.error("Error deleting director:", error.message);
            } else {
                console.log("director deleted successfully");
                window.location.reload();
            }
        }
    };

    const handleEdit = () => {
        navigate(`/directors/${director.id_dir}`);
    };

    const isEditAndDeleteDisabled = userRole === director.role;

    return (
        <>
            <div className="director-card">
                <div className="left-director-card">
                    <h3>{director.dir_lastname} {director.dir_name} {director.dir_patron}</h3>
                    <p><span className="label">Role:</span> {director.role}</p>
                    <p><span className="label">Date of birth:</span> {formatDate(director.date_birth)}</p>
                    <p><span className="label">Started working with Shchedryk:</span> {formatDate(director.date_start)}
                    </p>
                    <p><span className="label">Education:</span> {director.study}</p>
                    <p><span className="label">Contacts:</span> {director.phone_number}, {director.email}</p>
                    <p><span className="label">Address:</span> {director.city}, {director.street}</p>
                    <p>{director.bio}</p>
                    {userRole && !isEditAndDeleteDisabled && (
                        <>
                            <button id="edit-but-dir" onClick={handleEdit}>Edit Director</button>
                            <button id="delete-but-dir" onClick={handleDelete}>Delete Director</button>
                        </>
                    )}
                </div>
                <div className="right-director-card">
                    <img src={director.image_url} alt={`${director.dir_name} ${director.dir_lastname}`}/>
                </div>
            </div>
        </>
    )
}
export default DirectorCard;
