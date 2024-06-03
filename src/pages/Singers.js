import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import SingersTable from "../tableComponents/SingersTable";
import {Link} from "react-router-dom";
import '../styles/singers.css';

const Singers = () => {
    const [fetchError, setFetchError] = useState(null);
    const [singers, setSingers] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [showFilterWindow, setShowFilterWindow] = useState(false);

    useEffect(() => {
        const fetchSingers = async () => {
            const {data, error} = await supabase
                .from('singer')
                .select()

            if (error) {
                setFetchError('Could not fetch singers');
                setSingers(null);
                console.log(error);
            }
            if (data) {
                setSingers(data);
                setFetchError(null);
            }
        }
        fetchSingers();

        const storedUserRole = localStorage.getItem('userRole');
        setUserRole(storedUserRole);
    }, [userRole]);
    console.log(userRole)

    const handleOpenFilterWindow = () => {
        setShowFilterWindow(true);
    };

    const handleCloseFilterWindow = () => {
        setShowFilterWindow(false);
    };
    const handleFilterByVoice = async (voice) => {
        const { data, error } = await supabase
            .from('singer')
            .select()
            .filter(voice === 'All' ? null : { 'voice': 'eq.' + voice });

        if (error) {
            console.error('Error filtering singers by voice:', error.message);
            return;
        }

        setSingers(data);
    };
    return (
        <div className="page singers">
            {fetchError && (<p>{fetchError}</p>)}
            <div className="top-singer-block">
                <h1>Our singers</h1>
                {userRole && ( // Перевірка наявності користувача
                    <Link to="/add-singer" className="link-add">Add Singer</Link>
                )}
                <button className="filter-button" onClick={handleOpenFilterWindow}>Filter</button>
                {showFilterWindow && (
                    <div className="filter-window">
                        <h3>Chose your filter option</h3>
                        <div className="filter-options">
                            <button className="filter-option" onClick={() => handleFilterByVoice('soprano first')}>Soprano 1</button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('soprano second')}>Soprano 2</button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('alto first')}>Alto 1</button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('alto second')}>Alto 2</button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('bass')}>Bass</button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('All')}>All</button>
                        </div>
                        <button className="close-filter-window" onClick={handleCloseFilterWindow}>Close</button>
                    </div>
                )}
            </div>
            {singers && (
                <div className="singers">
                    <div className="singer-grid">
                        {singers.map(singer => (
                            <SingersTable key={singer.id_singer} singer={singer}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Singers;
