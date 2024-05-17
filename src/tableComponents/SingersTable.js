import '../styles/singer-card.css';

const SingerCard = ({singer}) => {
    return (
        <div className="singer-card">
            <div className="left-singer-card">
                <h3>{singer.singer_name} {singer.singer_lastname}</h3>
                <p>{singer.voice}</p>
                <p>{singer.date_birth}</p>
            </div>
            <div className="right-singer-card">
                <img src={singer.image_url} alt={`${singer.singer_name} ${singer.singer_lastname}`}/>
            </div>
        </div>
    )
}

export default SingerCard;
