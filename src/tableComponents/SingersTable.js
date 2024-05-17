import '../styles/singer-card.css';
const singerCard = ({singer}) => {
    return (
        <div className="singer-card">
            <h3>{singer.singer_name} {singer.singer_lastname}</h3>
            <p>{singer.singer_voice}</p>
        </div>
    )
}

export default singerCard;