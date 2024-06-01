import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import SingersTable from "../tableComponents/SingersTable";
import {Link} from "react-router-dom";

const Singers = () => {
    const [fetchError, setFetchError] = useState(null);
    const [singers, setSingers] = useState(null);
    const [userRole, setUserRole] = useState(null);

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

    return (
        <div className="page singers">
            {fetchError && (<p>{fetchError}</p>)}
            <div className="top-singer-block">
                <h1>Our singers</h1>
                {userRole && ( // Перевірка наявності користувача
                    <Link to="/add-singer" className="link-add">Add Singer</Link>
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
