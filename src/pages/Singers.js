import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";
import SingersTable from "../tableComponents/SingersTable";

const Singers = () => {
    const [fetchError, setFetchError] = useState(null);
    const [singers, setSingers] = useState(null);

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
    }, [])
    return (
        <div className="page singers">
            {fetchError && (<p>{fetchError}</p>)}
            <h1>Our singers</h1>
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