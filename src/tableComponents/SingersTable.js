import '../styles/singer-card.css';

const SingerCard = ({singer}) => {
    return (
        <div className="singer-card">
            <img src={singer.image_url} alt={`${singer.singer_name} ${singer.singer_lastname}`}/>
            <h3>{singer.singer_name} {singer.singer_lastname}</h3>
            <p>{singer.voice}</p>
        </div>
    )
}

export default SingerCard;
