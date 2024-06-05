import "../styles/directors.css"

const DirectorCard = ({director}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <>
            <div className="director-card">
                <div className="left-director-card">
                    <h3>{director.dir_lastname} {director.dir_name} {director.dir_patron}</h3>
                    <p><span className="label">Role:</span> {director.role}</p>
                    <p><span className="label">Date of birth:</span> {formatDate(director.date_birth)}</p>
                    <p><span className="label">Started working with Shchedryk:</span> {formatDate(director.date_start)}</p>
                    <p><span className="label">Education:</span> {director.study}</p>
                    <p><span className="label">Contacts:</span> {director.phone_number}, {director.email}</p>
                    <p><span className="label">Address:</span> {director.city}, {director.street}</p>
                    <p>{director.bio}</p>
                </div>
                <div className="right-director-card">
                    <img src={director.image_url} alt={`${director.dir_name} ${director.dir_lastname}`} />
                </div>
            </div>
        </>
    )
}
export default DirectorCard;
