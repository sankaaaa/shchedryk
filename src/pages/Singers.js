import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import SingersTable from "../tableComponents/SingersTable";
import {Link} from "react-router-dom";
import '../styles/singers.css';

const Singers = () => {
    //states
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
        fetchSingers(); //fetch singers data on component mount

        const storedUserRole = localStorage.getItem('userRole');
        setUserRole(storedUserRole);
    }, [userRole]); //re-fetch singers data when user role changes
    console.log(userRole)

    //function to open the filter window
    const handleOpenFilterWindow = () => {
        setShowFilterWindow(true);
    };

    //function to close the filter window
    const handleCloseFilterWindow = () => {
        setShowFilterWindow(false);
    };

    //function to filter singers by voice
    const handleFilterByVoice = async (voice) => {
        try {
            let data;
            if (voice === 'All') {
                ({data} = await supabase.from('singer').select());
            } else {
                ({data} = await supabase.from('singer').select().eq('voice', voice));
            }

            setSingers(data);
        } catch (error) {
            console.error('Error filtering singers by voice:', error.message);
        }
    };

    return (
        <div className="page singers">
            {fetchError && (<p>{fetchError}</p>)}
            <div className="top-singer-block">
                <h1>Our singers</h1>
                <div className="button-group">
                    {userRole && (
                        <Link to="/add-singer" className="link-add">Add Singer</Link>
                    )}
                    <button className="filter-button" onClick={handleOpenFilterWindow}>Filter</button>
                </div>
                {showFilterWindow && (
                    <div className="filter-window">
                        <h3>Chose your filter option</h3>
                        <div className="filter-options">
                            <button className="filter-option"
                                    onClick={() => handleFilterByVoice('soprano first')}>Soprano 1
                            </button>
                            <button className="filter-option"
                                    onClick={() => handleFilterByVoice('soprano second')}>Soprano 2
                            </button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('alto first')}>Alto 1
                            </button>
                            <button className="filter-option" onClick={() => handleFilterByVoice('alto second')}>Alto
                                2
                            </button>
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
